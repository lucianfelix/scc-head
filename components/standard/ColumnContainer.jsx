'use server';

import {Column} from "./Column";

export function ColumnContainer({data}) {
    const { type, 'class': clazz, columns } = data;

    return (
        <div className={"column-container " + clazz}>
            {columns.map((column, index) => {
                return <Column data={column}/>
            })}
        </div>
    )
}