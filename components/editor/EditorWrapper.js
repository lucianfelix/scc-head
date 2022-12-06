'use client';

// import AceEditor from "react-ace";
import dynamic from "next/dynamic";

// import { lazy } from 'react';
// const AceEditor = lazy(() => import('react-ace').then((module) => ({ default: module.AceEditor })));

const isSSR = () => typeof window === 'undefined';

const Editor = isSSR() ? ()=>null : dynamic(
    async () => {
        const ace = await import('react-ace');
        console.log("imported ace", ace);
        // exports.window = {};
        import('ace-builds/src-noconflict/mode-json');
        import('ace-builds/src-noconflict/theme-tomorrow');
        return ace;
    },
    {
        //eslint-disable-next-line react/display-name
        // loading: () => (
        //     <p>Loading...</p>
        // ),
        ssr: false,
    },
);

export function EditorWrapper() {



    console.log('EditorWrapper(): isSSR = ', isSSR());

    if(isSSR()) {
        return null;
    }

    import('ace-builds/src-noconflict/mode-json');
    import('ace-builds/src-noconflict/theme-tomorrow');

    function onLoad(editorState) {
        console.log(editorState);
    }

    function onChange(editorState) {
        console.log(editorState);
    }

    return (
        <div className="editor-wrapper">
            <Editor
                placeholder="Placeholder Text"
                mode="json"
                theme="tomorrow"
                name="editor"
                onLoad={onLoad}
                onChange={onChange}
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={`
{
  "some": "text",
  "a": 3,
  "some": "bla"
}`}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: 2,
                    // basePath: "ace-builds/src-noconflict"
                }}/>
        </div>
    )
}