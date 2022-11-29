'use server';

import {ColumnContainer} from './ColumnContainer';
import {CardContainer} from './CardContainer';
import ArticleList from "../article-list";
import Slideshow from "../slideshow";
import {GenericBlock, GenericBlockProps} from "./GenericBlock";

type SectionProps = {
    data: {
        type: "card",
        metadata: {
            Style: string,
        },
        blocks: [any]
    }
}

export default function Section({data} : SectionProps) {
    const { type, metadata, blocks } = data;

    let blockComponents = [];

    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        const blockComponent = createBlockComponent(block);
        blockComponents.push(blockComponent);
    }

    return <div className={"section " + (metadata?.Style ? metadata?.Style : "")}>
        {blockComponents}
    </div>;
}

function createBlockComponent(block: any) {
    const { type, 'class': clazz} = block;

    //block type can be column-container, card-container or custom

    if (type === "column-container") {
        return <ColumnContainer data={block}/>
    }

    if (type === "card-container") {
        return <CardContainer data={block}/>
    }

    if (type === "article-list") {
        // @ts-ignore
        return <ArticleList data={block}/>
    }

    if (type === "slideshow") {
        return <Slideshow data={block}/>
    }

    return <GenericBlock data={block}/>
}