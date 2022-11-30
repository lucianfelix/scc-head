'use server';

import {parse} from '../../lib/data';
import {Page as RnaPage} from '../../components/standard/Page';
import "./global.css";

export default async function Page() {

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
