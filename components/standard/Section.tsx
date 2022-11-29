'use server';

import {ColumnContainer} from './ColumnContainer';
import {CardContainer} from './CardContainer';
import ArticleList from "../article-list";
import Slideshow from "../slideshow";

export default function Section({data}) {

    const blocks = data.blocks;

    let blockComponents = [];

    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        const blockComponent = createBlockComponent(block);
        blockComponents.push(blockComponent);
    }

    return <div className={"section"}>
        {blockComponents}
    </div>;
}

function createBlockComponent(block) {
    const type = block.type;
    // const props = block.props;
    // const key = block.key;

    //block type can be column-container, card-container or custom

    if (type === "column-container") {
        return <ColumnContainer data={block}/>
    }

    if (type === "card-container") {
        return <CardContainer data={block}/>
    }

    if (type === "article-list") {
        return <ArticleList data={block}/>
    }

    if (type === "slideshow") {
        return <Slideshow data={block}/>
    }
}