'use server';

import {parse} from '../../lib/parsers/hlx/boilerplate';
import {Page as RnaPage} from '../../components/standard/Page';
import "./global.css";

export default async function Page() {



    // Selecting a specific field using an inline getSnapshot
    //const selectedField = useSyncExternalStore(store.subscribe, () => store.getSnapshot().selectedField);

    const source = await parse(
        "https://www.hlx.live/home",
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
                <RnaPage dataOld={source} indexData={{}}/>
            </main>
            <footer className={"footer-wrapper"}></footer>
        </>
    );
}
