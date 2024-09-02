import type { QueryDslQueryContainer, SearchResponse } from "@elastic/elasticsearch/lib/api/types";
import elasticSearch, { ESIndexName } from "../config/elasticSearch.config"
import { Fields, type SearchPayload } from "../types/type";

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
                            [key]: value?.map((d : string)=>d.toLowerCase()),
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
