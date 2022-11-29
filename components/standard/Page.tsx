'use server';

import Section from "./Section";

// @ts-ignore
export function Page({data}) {
    return <div className={"page"}>
        {data.sections.map((section: { type: "card"; metadata: { Style: string; }; blocks: [any]; }, index: any) => {
            return <Section data={section}/>
        })}
    </div>;
}