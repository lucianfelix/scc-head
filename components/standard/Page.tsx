'use client';

import Section from "./Section";
import {useEffect, useState, useSyncExternalStore} from "react";
import {dummyStore, firebaseStore, firebaseStoreStorageInstance} from "../../lib/db";

// @ts-ignore
export function Page({dataOld, indexData}) {
    useEffect(() => firebaseStoreStorageInstance.fetch(), []);
    const data = useSyncExternalStore(firebaseStore.subscribe, firebaseStore.getSnapshot, firebaseStore.getServerSnapshot);
    //const store = useSyncExternalStore(dummyStore.subscribe, dummyStore.getSnapshot, dummyStore.getServerSnapshot);
    // Selecting a specific field using an inline getSnapshot
    // const store = useSyncExternalStore(
    //     firebaseStore.subscribe,
    //     () => firebaseStore.getSnapshot().then(snapshot => snapshot.result));
    // const [val, setVal] = useState();
    // useEffect(() => {
    //     store.then((v) => {
    //         console.log('store', v);
    //         setVal(v)
    //     });
    // },[store]);
    console.log("Got updated data at: ", new Date().toLocaleTimeString());
    console.log('Render at ', new Date().toLocaleTimeString(), "data:", data.description);

    return <>
        <div className={"page"}>
            {/*<p>{store}</p>*/}
            {data?.sections?.map((section: { type: "card"; metadata: { Style: string; }; blocks: [any]; }, index: any) => {
                return <Section data={section} indexData={indexData}/>
            })}
        </div>
    </>;
}
