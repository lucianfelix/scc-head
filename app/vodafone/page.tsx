'use server';

import {parse} from '../../lib/data';
import {Page as RnaPage} from '../../components/standard/Page';
import "./global.css";

export default async function Page() {

    const source = await parse(
        "https://main--vodafone--hlxsites.hlx.live",
        []
    );

    return (
        <>
            <header className={"header-wrapper"}>
                <div className="header block">
                    <nav aria-expanded="false">
                        {/*<div className="nav-hamburger"><div className="nav-hamburger-icon"></div></div>*/}
                    </nav>
                </div>
            </header>
            <main>
                <RnaPage data={source} indexData={{}}/>
            </main>
            <footer className={"footer-wrapper"}></footer>
        </>
    );
}
