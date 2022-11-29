'use server';

import Section from "./Section";

export function Page({data}) {
    return <div className={"page"}>
        {data.sections.map((section, index) => {
            return <Section data={section}/>
        })}
    </div>;
}