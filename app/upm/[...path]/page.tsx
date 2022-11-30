'use server';

import {parse} from '../../../lib/data';
import {Page as RnaPage} from '../../../components/standard/Page';
// import "./global.css";

export default async function Page({params}) {
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
