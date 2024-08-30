export enum Fields {
    NAME = "name",
    FIRST_NAME = "firstname",
    LAST_NAME = "lastname",
    AGE = "age",
    BALANCE = "balance",
    GENDER = "gender",
    ACCOUNT_NUMBER = "account_number"
}

export enum OrderByType {
    asc = "asc",
    desc = "desc",
}

export interface UserCredentials {
    email: string;
    password: string;
}

export type Range = { gte?: number; lte?: number };
export interface Filters {
    name?: string;
    age?: Range;
    balance?: Range;
    gender?: 'm' | 'f';
    account_number?: number;
}

export interface SearchPayload {
    filters?: Filters;
    sort?: {  [key: string]: OrderByType };
    pagination: { pageIndex: number, pageSize: number };
}