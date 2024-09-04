import type { QueryDslQueryContainer, SearchResponse } from "@elastic/elasticsearch/lib/api/types";
import elasticSearch, { ESIndexName } from "../config/elasticSearch.config"
import { Fields, OrderByType, type SearchPayload } from "../types/type";
import accountModel, { type AccountType } from "../models/account.model";
import { getNextAccountNumber } from "../utils/generateACNumber";

export const getAccountsFromES = async ({ pagination, filters, sort }: SearchPayload): Promise<SearchResponse> => {
    const NumberSortKeys = [Fields.AGE, Fields.ACCOUNT_NUMBER, Fields.BALANCE]
    const mustClauses: QueryDslQueryContainer[] = [];
    // const shouldClauses: QueryDslQueryContainer[] = [];

    if (filters) {
        // biome-ignore lint/complexity/noForEach: <explanation>
        Object.entries(filters).forEach(([key, value]) => {
            switch (key) {
                case Fields.NAME:
                    mustClauses.push({
                        multi_match: {
                            query: value as string,
                            fields: [Fields.FIRST_NAME, Fields.LAST_NAME],
                        },
                    });
                    break;

                case Fields.AGE:
                case Fields.BALANCE:
                    mustClauses.push({
                        range: {
                            [key]: value,
                        },
                    });
                    break;

                case Fields.GENDER:
                    mustClauses.push({
                        terms: {
                            [key]: value?.map((d: string) => d.toLowerCase()),
                        },
                    });
                    break;

                default:
                    mustClauses.push({
                        match: {
                            [key]: value,
                        },
                    });
                    break;
            }
        });
    } else {
        mustClauses.push({ match_all: {} });
    }

    const result = await elasticSearch.search({
        index: ESIndexName.Accounts,
        body: {
            query: {
                bool: {
                    must: mustClauses,
                    // should: shouldClauses.length > 0 ? shouldClauses : undefined,
                },
            },
            sort: sort ? {
                [NumberSortKeys.includes(sort.name as any) ? sort.name : `${sort.name}.keyword`]: {
                    order: sort.direction,
                }
            } : undefined,
        },
        from: (pagination.pageIndex - 1) * pagination.pageSize,
        size: pagination.pageSize,
    });

    return result;
};

const addNewAccountES = async (account: AccountType) => {
    try {
        // Extract only the necessary fields from the Mongoose document
        const { _id, ...accountData } = account.toObject(); // Convert Mongoose document to plain object

        await elasticSearch.index({
            index: ESIndexName.Accounts,
            id: _id.toString(), // Ensure _id is converted to string
            body: accountData // Exclude _id from body
        });
    } catch (err: unknown) {
        console.error('Error adding account to Elasticsearch:', err);
        throw new Error('Unable to add account to Elasticsearch');
    }
}

export const addNewAccount = async (account: AccountType) => {
    account.account_number = await getNextAccountNumber();
    const newAccount = new accountModel(account);
    try {
        await newAccount.save();
        await addNewAccountES(newAccount)
        return newAccount;
    } catch (err: unknown) {
        console.log(err);
        const message = "Unable to create account";
        throw new Error(message);
    }
}

const updateExsistingAccountES = async (id: string, payload: Partial<AccountType>) => {
    try {
        // Ensure _id is not included in the payload, as it is a metadata field
        const { _id, ...doc } = payload;

        await elasticSearch.update({
            index: ESIndexName.Accounts,
            id: id,
            body: {
                doc: doc // Use the 'doc' field to specify the update
            }
        });
    } catch (error) {
        console.error('Error updating account in Elasticsearch:', error);
        throw new Error('Unable to update account in Elasticsearch');
    }
}

export const updateExsistingAccount = async (id: string, payload: {}) => {
    try {
        await accountModel.findByIdAndUpdate(id, payload);
        await updateExsistingAccountES(id, payload);
        return;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

const deleteAccountES = async (id: string) => {
    try {
        await elasticSearch.delete({
            index: ESIndexName.Accounts,
            id: id,
        })
    } catch (error) {
        throw new Error('Unable to update account in Elasticsearch');
    }
}

export const deleteAccount = async (id: string) => {
    try {
        await accountModel.findByIdAndDelete(id);
        await deleteAccountES(id);
    } catch (error: any) {
        throw new Error(error.message);
    }
}