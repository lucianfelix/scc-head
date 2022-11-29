'use server';

import {Column} from "./Column";

export function ColumnContainer({data}) {
    const { type, 'class': clazz, columns } = data;

    let columnsClass = "";
    if(columns.length === 2) {
        columnsClass = "two";
    }

    if(clazz) {
        columnsClass+= " " + clazz;
    }

    return (
        <div className={"columns-wrapper"}>
            <div className={"columns block " + columnsClass}>
                <div>
                    {columns.map((column, index) => {
                        return <Column data={column} index={index}/>
                    })}
                </div>
            </div>
        </div>
    )
}