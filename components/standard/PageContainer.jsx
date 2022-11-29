'use server';

import Page from "./Page";

export default async function PageContainer({source}) {
    //
    // const Component = lookupComponent("page");
    // if (!Component) {
    //     return null;
    // }

    return (
        <div>
            <Page source={source}/>
        </div>
    )
}

function lookupComponent(type) {
    const lookupObject = {
        page: Page
    };

    // @ts-ignore
    return lookupObject[type];
}
