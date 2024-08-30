import { PaginationState } from "@tanstack/react-table";
import { OrderByType } from "./OrderComponent";

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