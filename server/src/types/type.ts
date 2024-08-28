export enum Fields {
    NAME = "name",
    FIRST_NAME = "firstname",
    LAST_NAME = "lastname",
    AGE = "age",
    BALANCE = "balance"
}

export enum OrderByType {
    asc = "asc",
    desc = "desc",
}

export interface UserCredentials {
    email: string;
    password: string;
}

export interface SearchPayload {
    filters?: { [key: string]: string };
    sort?: {  [key: string]: OrderByType };
    pagination: { pageIndex: number, pageSize: number };
}