import {parse} from "node-html-parser";

const fs = require("fs/promises");
var path = require("path");

export async function load(url, customParsers) {
    let data;
    if(!url) {
        var jsonPath = path.join(__dirname, "../../..", "input.sample1.html");
        data = await fs.readFile(jsonPath, {encoding: "utf8"});
    } else {
        const response = await fetch(url);
        data = await response.text();
    }
    const root = parse(data);
    const main = root.getElementsByTagName("main")[0];
    console.log(main);

    //find the Hero: first h1 in the main
    const hero = main.querySelector("h1");
    if (hero) {
        //if the hero and the picture are adjacent, then the picture is the hero
        const heroPicture = hero.nextElementSibling;
        if (heroPicture && heroPicture.tagName === "picture") {
            console.log(heroPicture);
        }
    }

    //each <div> in the main element is a section
    //const sections = main.getElementsByTagName("div");
    const sections = main.childNodes.map((s) => parseSection(s, customParsers)).filter(section => section !== null);

    return {
        type: "page",
        title: root.getElementsByTagName("title")[0]?.innerHTML,
        description: root.querySelector("meta[name='description']")?.getAttribute("content"),
        class: main.getAttribute("class"),
        sections: sections,
    };
}

function parseSection(section, customParsers) {

    if (section === null || section.nodeType !== 1) {
        return null;
    }

    section.removeWhitespace();

    //a section can have metadata in the form of a <div> with a class of "section-metadata"
    const metadataDiv = section.querySelector("div.section-metadata");
    let metadata;
    if (metadataDiv) {
        //parse the metadata
        //each div in metadata is a key/value pair
        const metadataItems = metadataDiv.querySelectorAll("div");
        const props = metadataItems.forEach(item => {
            const divs = item.getElementsByTagName("div");
            if (divs?.length === 2) {
                if(divs[0]?.text && divs[1]?.text) {
                    if(!metadata) {
                        metadata = {};
                    }
                    metadata[divs[0].innerHTML] = divs[1].innerHTML;
                }
            }
        });
    }

    //each child of the section is a block
    const blocks = section.childNodes.map((b) => parseBlock(b, customParsers));

    const outSection = {
        type: "section",
        metadata: metadata,
        class: section.getAttribute("class"),
        blocks: blocks.filter(block => block !== null),
    };

    if (outSection.blocks.length === 0) {
        return null;
    }

    return outSection;
}

/**
 * Parse a block to the corresponding block type
 * Blocks are:
 * - headings
 * - paragraphs
 * - columns
 * - cards
 * @param block
 */
function parseBlock(block, customParsers) {
    if(block === null) {
        return null;
    }
    const blockType = block.tagName;
    if(!blockType) {
        return null;
    }

    const blockClass = block.getAttribute("class");

    //skip section metadata
    if(blockClass === "section-metadata") {
        console.log("skipping section metadata");
        return null;
    }

    //if div and class contains "columns" then it is a columns block
    if (blockType === "DIV" && blockClass?.includes("columns")) {
        return parseColumnContainer(block);
    }

    //if div and class contains "cards" then it is a cards block
    if (blockType === "DIV" && blockClass?.includes("cards")) {
        return parseCardContainer(block);
    }

    const matchingCustomParsers = customParsers?.filter(
        parser => blockClass?.includes(parser.blockType));

    if(matchingCustomParsers?.length > 0) {
        return matchingCustomParsers[0].parser(block);
    }

    return {
        type: blockType,
        class: blockClass,
        id: block.getAttribute("id"),
        content: block.innerHTML,
    };
}

/**
 * Parse a column container block
 *
 * @param columnContainer
 * @returns {{type: string, class: string, cards: [Card]}|null|*}
 */
function parseColumnContainer(columnContainer) {
    //each div in the column container is a column
    return {
        type: "column-container",
        class: columnContainer.getAttribute("class"),
        columns: columnContainer.childNodes.filter((n) => n.nodeType == 1).map(parseColumn).filter(column => column !== null),
    };
}

function parseColumn(colums) {
    return {
        type: "column",
        class: colums?.getAttribute("class"),
        content: colums?.innerHTML,
    };
}

function parseCardContainer(cardContainer) {
    //each div in the column container is a column
    return {
        type: "card-container",
        class: cardContainer.getAttribute("class"),
        cards: cardContainer.childNodes.filter((n) => n.nodeType == 1).map(parseCard).filter(card => card !== null),
    };
}

function parseCard(card) {
    return {
        type: "card",
        class: card?.getAttribute("class"),
        content: card?.innerHTML,
    };
}