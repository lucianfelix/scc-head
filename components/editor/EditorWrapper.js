'use client';

import dynamic from "next/dynamic";
import {useEffect, useState} from "react";
import {getData, saveData} from "../../lib/db"

const isSSR = () => typeof window === 'undefined';

const Editor = isSSR() ? ()=>null : dynamic(
    async () => {
        const ace = await import('react-ace');
        // exports.ace = ace;
        console.log("imported ace", ace);
        // exports.window = {};
        try {
            import('ace-builds/src-noconflict/mode-json');
            import('ace-builds/src-noconflict/theme-tomorrow');
            import('ace-builds/src-noconflict/ace');
        } catch (e) {}
        return ace;
    },
    {
        ssr: true,
    },
);

export function EditorWrapper() {
    const [showEditor, setShowEditor] = useState(false);
    const [data, setData] = useState("{}");

    useEffect(() => {
        setShowEditor(true);
        // const ace = Editor;
        //exports.ace = ace;
        // window.ace = ace;
        getData("hlx").then((data) => {
            console.log("data", data);
            setData(JSON.stringify(data, null, "\t"));
        });
    });

    console.log('EditorWrapper(): isSSR = ', isSSR());

    if(!showEditor) {
        return null;
    }

    try {
        import('ace-builds/src-noconflict/mode-json');
        import('ace-builds/src-noconflict/theme-tomorrow');
        import('ace-builds/src-noconflict/ace');
    } catch (e) {
        console.error(e);
    }

    function onLoad(editorState) {
        console.log(editorState);
    }

    function onChange(editorState) {
        console.log(editorState);
        saveData("hlx", JSON.parse(editorState));
    }

    return (
        <div className="editor-wrapper">
            <Editor
                width={"100%"}
                height={"800px"}
                placeholder="Placeholder Text"
                mode="json"
                theme="tomorrow"
                name="editor"
                onLoad={onLoad}
                onChange={onChange}
                fontSize={25}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={data}
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