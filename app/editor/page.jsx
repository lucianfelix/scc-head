'use server';

import "./editor.css";
import {EditorWrapper} from "../../components/editor/EditorWrapper";

// import dynamic from 'next/dynamic';

const isSSR = () => typeof window === 'undefined';
//
// const EditorWrapper = !isSSR ? dynamic(
//     () => import("../../components/editor/EditorWrapper")
//         .then((module) => ({ default: module.EditorWrapper }))
//     , {
//         ssr: false}) : () => null;

export default async function Page() {
    console.log('Page(): isSSR = ', isSSR());
    return (
        <>
            <main>
                <EditorWrapper/>
            </main>
        </>
    );
}
