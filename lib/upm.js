
function parseArticles(block) {

    return {
        type: "articles",
        class: block.getAttribute("class"),
        columns: []
    };
}


function parseSlideshow(block, customParsers) {

    //each div is a slide
    const slides = block.childNodes.map((s) => parseSlide(s, customParsers)).filter(slide => slide != null);

    return {
        type: "slideshow",
        class: block.getAttribute("class"),
        slides: slides
    };
}

function parseSlide(block, customParsers) {

    /*
    <div>
        <div>
            <picture/>
            s<a/>
        </div>
    </div>
     */

    //block = block?.childNodes.find((c) => c.tagName === "DIV");
    block = block?.childNodes.find((c) => c.tagName === "DIV");

    if(!block) {
        return null;
    }

    //a slide is a div that has a picture and a link inside
    const picture = block.childNodes.find((c) => c.tagName === "PICTURE");
    const link = block.childNodes.find((c) => c.tagName === "A");

    if(!picture && !link) {
        return null;
    }

    return {
        type: "slide",
        class: block.getAttribute("class"),
        picture: picture.outerHTML,
        link: {
            href: link.getAttribute("href"),
            text: link.text
        }
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