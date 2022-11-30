'use server';

import {ColumnContainer} from './ColumnContainer';
import {CardContainer} from './CardContainer';
import Articles from "../articles/articles";
import Slideshow from "../slideshow";
import {GenericBlock, GenericBlockProps} from "./GenericBlock";

type SectionProps = {
    data: {
        type: "card",
        metadata: {
            Style: string,
        },
        blocks: [any]
    },
    indexData: [any]
}

export default function Section({data, indexData} : SectionProps) {
    const { type, metadata, blocks } = data;

    let blockComponents = [];

    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        const blockComponent = createBlockComponent(block, indexData);
        blockComponents.push(blockComponent);
    }

    return <div className={"section " + (metadata?.Style ? metadata?.Style : "")}>
        {blockComponents}
    </div>;
}

function createBlockComponent(block: any, indexData: any) {
    const { type, 'class': clazz} = block;

    //block type can be column-container, card-container or custom

    if (type === "column-container") {
        return <ColumnContainer data={block}/>
    }

    if (type === "card-container") {
        return <CardContainer data={block}/>
    }

    //todo: lookups for custom components
    if (type === "articles") {
        // @ts-ignore
        return <Articles data={block} indexData={indexData}/>
    }

    if (type === "slideshow") {
        return <Slideshow data={block}/>
    }

    return <GenericBlock data={block}/>
}