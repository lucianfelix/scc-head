import {parse} from '../../lib/data';

import {Page as RnaPage} from '../../components/standard/Page';

import {parseSlideshow, parseArticles, parseLinkList} from '../../lib/upm.js';
import "./global.css";

export default async function Page() {

    // const indexResp = await fetch(`https://main--upm--hlxsites.hlx.live/query-index.json?limit=500&offset=0`);
    // const indexJson = await indexResp.json();
    // const indexData = indexJson.data;

    const source = await parse(
        "https://www.hlx.live/home",
        []
    );

    return (
        <div className="page">
            <RnaPage data={source} indexData={{}}/>
        </div>
    );
}
