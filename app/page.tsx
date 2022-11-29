import {parse} from '../lib/data';

import {Page as RnaPage} from '../components/standard/Page';

import {parseSlideshow, parseArticles, parseLinkList} from '../lib/upm.js';
import "./global.css";

export default async function Page() {

    const source = await parse(
        //"https://main--upm--hlxsites.hlx.live",
        null,
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
        <div className="page">
            <RnaPage data={source}/>

            {/*<h1 className="text-xl font-medium text-gray-300">Model</h1>*/}

            {/*<div>*/}
            {/*    <pre>{JSON.stringify(source, null, 2)}</pre>*/}
            {/*</div>*/}

            {/*<Slideshow />*/}
            {/*<ArticleList />*/}

        </div>
    );
}
