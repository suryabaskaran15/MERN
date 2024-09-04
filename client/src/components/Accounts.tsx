import { useEffect, useRef, useState } from "react";
import client from "../libs/client";
import Datagrid, { type SimpleColumn } from "./Datagrid/Datagrid";
import type { PaginationState } from "@tanstack/react-table";
import AccountFilter from "./AccountFilter";
import { type OrderByType, OrderComponent } from "./OrderComponent";
import { type AccountTableData, Fields, type FilterData, type SortType } from "./type";
import type { AccountModel, getAccountsRequest } from "@/libs/apiClient";
import { MdDelete, MdEdit } from "react-icons/md";
import AccountEditModel from "./AccountEditModel";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import DeleteModel from "./model/DeleteModel";


const Accounts: React.FC = () => {
    const [filters, setFilters] = useState<FilterData | null>(null);
    const [sort, setSort] = useState<SortType | null>(null);
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState<AccountTableData | null>(null);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const activeSort = useRef<string>('');
    const {toast} = useToast();
    const { data, mutate } = client.getAccounts.useMutation();
    const {mutate: addAccountMutate} = client.AddNewAccount.useMutation({
        onSuccess: (res) => {
            handleAddEditModel();
            onSearchSubmit();
            toast({description:res.data.message})
        }
    });
    const {mutate:UpdateAccountMutate} = client.UpdateAccount.useMutation({
        onSuccess: (res) => {
            handleAddEditModel();
            onSearchSubmit();
            toast({ description: res.data.message })
        }
    })
    const {mutate: deleteAccountMutate} = client.DeleteAccount.useMutation({
        onSuccess: (res) => {
            handleDeleteModel();
            onSearchSubmit();
            toast({ description: res.data.message });
        }
    });

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
        {
            id: "action",
            key: "action",
            header: "Action",
            cell: (_,row) => (
                <div className="flex">
                    <MdEdit size={20} onClick={() => {
                        setSelectedAccount(row); // Set the selected account
                        setIsEdit(true); // Open the modal
                    }}
                    />
                    <MdDelete size={20} onClick={() => {
                        setSelectedAccount(row); 
                        setIsDelete(true);
                    }} />
                </div>
            )

        }
    ];

    const onSearchSubmit = () => {
        const payload: getAccountsRequest = {
            pagination: { pageIndex: pagination.pageIndex + 1, pageSize: pagination.pageSize },
        };

        if (filters) {
            payload.filters = { ...filters, gender: filters?.gender?.map((d: { value: string }) => d.value) };
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

    const addEditSubmit = (values:AccountModel)=>{
        console.log(selectedAccount);
        if(selectedAccount){
            UpdateAccountMutate({body:{...values},id:selectedAccount._id});
            return;
        }
        addAccountMutate({body:{...values}})
    }

    const handleAddEditModel = ()=>{
        setIsEdit(false);
        setSelectedAccount(null);
    }

    const handleDeleteModel = () => {
        setIsDelete(false);
        setSelectedAccount(null);
    }

    useEffect(() => {
        onSearchSubmit();
    }, [pagination, filters, sort]);

    return (
        <div className="flex m-3">
            <AccountFilter onSubmit={onSubmit} />
            <div className="ml5">
                <Button className="float-end" onClick={()=>setIsEdit(true)}>Add  Account</Button>
                <Datagrid
                    data={data?.data?.data ?? []}
                    simpleColumns={columns as unknown as SimpleColumn<AccountModel>[]}
                    pagination={pagination}
                    setPagination={setPagination}
                    noResults="No data found"
                    pageCount={data?.data.pages ?? 0}
                />
            </div>
            {isEdit && <AccountEditModel isOpen={isEdit} onClose={handleAddEditModel} account={selectedAccount} onSave={addEditSubmit}/>}
            {isDelete && <DeleteModel isDelete={isDelete} handleDeleteModel={handleDeleteModel} onDelete={() => deleteAccountMutate({id:selectedAccount?._id as string})}/> }
        </div>
    );
};

export default Accounts;
