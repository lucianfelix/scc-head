'use server';

import {parse} from '../../../lib/parsers/hlx/boilerplate';
import {Page as RnaPage} from '../../../components/standard/Page';
import "../styles.css";

type ArticleEntry = {
  path: string;
  title: string;
  tags: string;
  description: string;
  lastModified: string;
  image: string;
}

// export async function generateStaticParams() {
//     const indexResp = await fetch(
//         `https://main--upm--hlxsites.hlx.live/query-index.json?limit=500&offset=0`,
//         {next: {revalidate: 36000}});
//
//     const indexJson = await indexResp.json();
//     const paths = indexJson.data.map((entry: ArticleEntry) => {
//         const pathItem = entry.path.split('/').slice(1);
//         if(pathItem.length > 1 && pathItem[0] === 'articles') {
//           return {path: pathItem};
//         }
//     });
//     const filteredPaths = paths.filter((path: any) => path != null);
//     return filteredPaths;
// }

type Params = {
    path: string[];
}

export default async function Page({params}: {params: Params}) {
    const hlxPath = params.path.join('/');
    console.log(hlxPath)
    const source = await parse(
        `https://main--upm--hlxsites.hlx.live/${hlxPath}`,
        []
    );

    return (
        <div className="page">
            <RnaPage data={source} indexData={{}}/>
        </div>
    );
}
