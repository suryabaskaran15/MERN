import React, { useEffect, useState } from "react";
import { FaSortDown, FaSortUp } from "react-icons/fa6";

export enum OrderByType {
    asc = "asc",
    desc = "desc",
}

interface OrderComponentProps {
    orderByCallback?: (value: OrderByType | undefined) => void;
    title: string;
    name: string;
    selected?: string;
    order?: OrderByType | undefined;
}

export function OrderComponent(props: OrderComponentProps) {
    const [orderBy, setOrderBy] = useState<OrderByType | undefined>(props?.order ?? undefined);

    useEffect(() => {
        if (props.selected !== props.name) {
            setOrderBy(undefined);
        }
    }, [props.selected]);

    const sort = () => {
        let state: OrderByType | undefined;
        if (orderBy === OrderByType.asc) {
            state = undefined;
        } else if (orderBy === OrderByType.desc) {
            state = OrderByType.asc;
        } else if (!orderBy) {
            state = OrderByType.desc;
        }
        setOrderBy(state);
        props?.orderByCallback?.(state);
    };

    return (
        <div onClick={sort} className="flex" style={{cursor:"pointer"}}>
            <span>{props.title.toUpperCase()}</span>
            <div>
                {!orderBy && ""}
                {orderBy === OrderByType.asc && <FaSortUp />}
                {orderBy === OrderByType.desc && <FaSortDown />}
            </div>
        </div>
    );
}
