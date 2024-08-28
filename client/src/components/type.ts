import { PaginationState } from "@tanstack/react-table";
import { OrderByType } from "./OrderComponent";

export enum Fields {
    NAME = "name",
    FIRST_NAME = "firstname",
    LAST_NAME = "lastname",
    AGE = "age",
    BALANCE = "balance",
    ACCOUNT_NUMBER = "account_number"
}

export interface FilterData {
    [key: string]: string;
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