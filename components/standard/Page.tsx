'use server';

import Section from "./Section";

// @ts-ignore
export function Page({data, indexData}) {
    return <>
        <div className={"page"}>
            {data.sections.map((section: { type: "card"; metadata: { Style: string; }; blocks: [any]; }, index: any) => {
            return <Section data={section} indexData={indexData}/>
        })}
    </div></>;
}
