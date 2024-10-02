import type { PaginationState } from "@tanstack/react-table";
import type { OrderByType } from "./OrderComponent";

export enum Fields {
    NAME = "name",
    FIRST_NAME = "firstname",
    LAST_NAME = "lastname",
    AGE = "age",
    BALANCE = "balance",
    ACCOUNT_NUMBER = "account_number",
    GENDER = "gender",
    EMAIL= "email",
}

export interface FilterData {
    name?: string;
    age?: Range;
    balance?: Range;
    gender?: { label: string;  value: 'm' | 'f'}[];
    account_number?: number;
}

export interface SortType{
    name: string;
    direction: OrderByType;
}

export interface SearchFilterProps {
    filters?: FilterData;
    sort?: SortType;
    pagination: PaginationState;
}

export interface AccountTableData {
    _id: string;
    account_number: string;
    name: string;
    gender: string;
    firstname: string;
    lastname: string;
    age: number;
    email: string;
    balance: number;
    address: string;
    city: string;
    state: string;
    action: string;
}