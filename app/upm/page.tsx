'use client';

import {parse} from '../../lib/parsers/hlx/boilerplate';
import {Page as RnaPage} from '../../components/standard/Page';

import {parseSlideshow, parseArticles, parseLinkList} from '../../lib/parsers/hlx/upm.js';
import "./styles_min.css";
import "./header.css";
import "./upm_min.css";
import {useSyncExternalStore} from "react";
import {firebaseStore} from "../../lib/db";
// import "./hero.css";
//import "./link-list.css";
// import "./cards.css";
// import "./columns.css";
//import "./footer.css";
//import "./comps.css";

export default async function Page() {

    // const externalStore = useSyncExternalStore(firebaseStore.subscribe, firebaseStore.getSnapshot);

    const indexResp = await fetch(
        `https://main--upm--hlxsites.hlx.live/query-index.json?limit=500&offset=0`,
        {next: {revalidate: 360000}});

    const indexJson = await indexResp.json();
    const indexData = indexJson.data;

    const source = await parse(
        "https://main--upm--hlxsites.hlx.live",
        [
            {
                blockType: "slideshow",
                parser: parseSlideshow
            },
            {
                blockType: "article",
                parser: parseArticles
            },
            {
                blockType: "link-list",
                parser: parseLinkList
            },
        ]
    );

    return (
        <>
            <header className={"header-wrapper"}>
                <div className="header block">
                <nav aria-expanded="false" dangerouslySetInnerHTML={{ __html: source?.nav?.content }}>
                    {/*<div className="nav-hamburger"><div className="nav-hamburger-icon"></div></div>*/}
                </nav>
                </div>
            </header>
            <main>
                <RnaPage data={source} indexData={indexData}/>
            </main>
            <footer className={"footer-wrapper"}></footer>
        </>
    );
}
