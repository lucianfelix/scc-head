'use server';
import "./editor.css";
import {EditorWrapper} from "../../components/editor/EditorWrapper";

const isSSR = () => typeof window === 'undefined';

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
