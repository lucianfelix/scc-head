'use server';

import Section from "./Section";

export function Page({data}) {

    return <div className={"section"}>
        {data.sections.map((section, index) => {
            return <Section data={section}/>
        })}
    </div>;
}