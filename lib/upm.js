
function parseArticles(block) {

    return {
        type: "articles",
        class: block.getAttribute("class"),
        columns: []
    };
}


function parseSlideshow(block) {

    return {
        type: "slideshow",
        class: block.getAttribute("class"),
        columns: []
    };
}

function parseLinkList(block) {

    return {
        type: "linkList",
        class: block.getAttribute("class"),
        columns: []
    };
}

export {parseSlideshow, parseArticles, parseLinkList};