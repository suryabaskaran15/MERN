import { useEffect, useRef, useState } from "react";
import client from "../libs/client";
import Datagrid, { SimpleColumn } from "./Datagrid/Datagrid";
import { PaginationState } from "@tanstack/react-table";
import AccountFilter from "./AccountFilter";
import { OrderByType, OrderComponent } from "./OrderComponent";
import { Fields, FilterData, SortType } from "./type";
import { getAccountsRequest } from "@/libs/apiClient";

interface AccountTableData {
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
}


const Accounts: React.FC = () => {
    const { data, mutate } = client.getAccounts.useMutation();
    const [filters, setFilters] = useState<FilterData | null>(null);
    const [sort, setSort] = useState<SortType | null>(null);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const activeSort = useRef<string>('');

    const columns: SimpleColumn<AccountTableData>[] = [
        {
            id: "account_number",
            key: "account_number",
            header: () => (
                <span className="notification-table-th">
                    <OrderComponent
                        title="A/C no"
                        selected={activeSort.current}
                        orderByCallback={(value) => handleSorting(value, Fields.ACCOUNT_NUMBER)}
                        name={Fields.ACCOUNT_NUMBER}
                        order={sort?.direction}
                    />
                </span>
            ),
            cell: (value) => <>{value}</>,
        },
        {
            id: "name",
            key: "name",
            header: () => (
                <span className="notification-table-th">
                    <OrderComponent
                        title={Fields.NAME}
                        selected={activeSort.current}
                        orderByCallback={(value) => handleSorting(value, Fields.FIRST_NAME)}
                        name={Fields.FIRST_NAME}
                        order={sort?.direction}
                    />
                </span>
            ),
            cell: (_, row) => <>{`${row.firstname} ${row.lastname}`}</>,
        },
        {
            id: "age",
            key: "age",
            header: () => (
                <span className="notification-table-th">
                    <OrderComponent
                        title={Fields.AGE}
                        selected={activeSort.current}
                        orderByCallback={(value) => handleSorting(value, Fields.AGE)}
                        name={Fields.AGE}
                        order={sort?.direction}
                    />
                </span>
            ),
            cell: (value) => <>{value}</>,
        },
        {
            id: "gender",
            key: "gender",
            header: () => (
                <span className="notification-table-th">
                    <OrderComponent
                        title={Fields.GENDER}
                        selected={activeSort.current}
                        orderByCallback={(value) => handleSorting(value, Fields.GENDER)}
                        name={Fields.GENDER}
                        order={sort?.direction}
                    />
                </span>
            ),
            cell: (value) => <>{value}</>,
        },
        {
            id: "email",
            key: "email",
            header: "Email",
            cell: (value) => <>{value}</>,
        },
        {
            id: "balance",
            key: "balance",
            header: () => (
                <span className="notification-table-th">
                    <OrderComponent
                        title={Fields.BALANCE}
                        selected={activeSort.current}
                        orderByCallback={(value) => handleSorting(value, Fields.BALANCE)}
                        name={Fields.BALANCE}
                        order={sort?.direction}
                    />
                </span>
            ),
            cell: (value) => <>{value}</>,
        },
        {
            id: "address",
            key: "address",
            header: "Address",
            cell: (value, row) => <>{`${value}, ${row.city}, ${row.state}`}</>,
        },
    ];

    const onSearchSubmit = () => {
        const payload: getAccountsRequest = {
            pagination: { pageIndex: pagination.pageIndex + 1, pageSize: pagination.pageSize },
        };

        if (filters) {
            payload.filters = { ...filters , gender : filters?.gender?.map((d : {value: string})=>d.value) };
        }
        if (sort) {
            payload.sort = { ...sort };
        }

        mutate({ body: payload });
    };

    const onSubmit = (value: FilterData) => {
        setFilters({ ...value });
    };

    const handleSorting = (order: OrderByType | undefined, name: string) => {
        if (order) {
            setSort({ name, direction: order });
        } else {
            setSort(null);
        }
        activeSort.current = name;
    };

    useEffect(() => {
        onSearchSubmit();
    }, [pagination, filters, sort]);

    return (
        <div className="flex m-3">
            <AccountFilter onSubmit={onSubmit} />
            <div className="ml5">
                <Datagrid
                    data={data?.data?.data ?? []}
                    simpleColumns={columns}
                    pagination={pagination}
                    setPagination={setPagination}
                    noResults="No data found"
                    pageCount={10}
                />
            </div>
        </div>
    );
};

export default Accounts;
