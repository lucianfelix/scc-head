import {parse} from '../lib/data';
import Link from 'next/link';

import Slideshow from '../components/slideshow';
import ArticleList from '../components/article-list';
import {Page as RnaPage} from '../components/standard/Page';

import {parseSlideshow, parseArticles, parseLinkList} from '../lib/upm.js';
import PageContainer from "../components/standard/PageContainer";
import "./global.css";

export default async function Page() {

    const source = await parse(
        "https://main--upm--hlxsites.hlx.live",
        //null,
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
        <div className="space-y-8">
            <RnaPage data={source}/>

            <h1 className="text-xl font-medium text-gray-300">Model</h1>

            <div>
                <pre>{JSON.stringify(source, null, 2)}</pre>
            </div>

            {/*<Slideshow />*/}
            {/*<ArticleList />*/}

        </div>
    );
}
