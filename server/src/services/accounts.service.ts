import { QueryDslQueryContainer, SearchResponse } from "@elastic/elasticsearch/lib/api/types";
import elasticSearch from "../config/elasticSearch.config"
import { Fields, SearchPayload } from "../types/type";

export const getAccountsFromES = async ({ pagination, filters , sort }: SearchPayload): Promise<SearchResponse> => {
    let mustClauses: QueryDslQueryContainer[] = [];

    if (filters) {
        mustClauses = Object.entries(filters).map(([key, value]) => {
            if (key === Fields.NAME) {
                return {
                    multi_match: {
                        query: value as string,
                        fields: [Fields.FIRST_NAME, Fields.LAST_NAME]
                    }
                };
            } else if (key === Fields.AGE || key === Fields.BALANCE) {
                return {
                    range: {
                        [key]: value as unknown as object
                    }
                }
            }
            return {
                match: { [key]: value }
            };
        });
    } else {
        mustClauses = [{ match_all: {} }];
    }

    const result = await elasticSearch.search({
        index: 'accounts',
        body: {
            query: {
                bool: {
                    must: [...mustClauses]
                }
            },
            sort: sort ? {[sort.name]:sort.direction}:undefined 
        },
        from: (pagination.pageIndex - 1) * pagination.pageSize,
        size: pagination.pageSize,
    });

    return result;
}