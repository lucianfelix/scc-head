import {load} from '../lib/data';
import Link from 'next/link';

import {parseSlideshow, parseArticles, parseLinkList} from '../lib/upm.js';

export default async function Page() {

    const data = await load(
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
        <div className="space-y-8">
            <h1 className="text-xl font-medium text-gray-300">Examples</h1>

            <div>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>

        </div>
    );
}
