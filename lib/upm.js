function parseArticles(block) {

    //each div inside is a row with 3 columns inside
    //in each column, first child is the header, second is the content, third is the style

    if (block.childNodes.length != 3) {
        console.log("articles block does not have 3 columns");
        return null;
    }

    const headers = block.childNodes[0].childNodes.map((c) => c.innerHTML);
    const contents = block.childNodes[1].childNodes.map((c) => c.innerHTML);
    const styles = block.childNodes[2].childNodes.map((c) => c.innerHTML);

    let articles = [];

    for (let i = 0; i < headers.length; i++) {
        articles.push({
            header: headers[i],
            content: contents[i],
            style: styles[i]
        });
    }

    return {
        type: "articles",
        class: block.getAttribute("class"),
        articles: articles
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
            <picture/>
            s<a/>
        </div>
     */

    block = block?.childNodes.find((c) => c.tagName === "DIV");

    if (!block) {
        return null;
    }

    //a slide is a div that has a picture and a link inside
    const picture = block.childNodes.find((c) => c.tagName === "PICTURE");
    const link = block.childNodes.find((c) => c.tagName === "A");

    if (!picture && !link) {
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
    //<ul> two level deep will contain a list of links
    const ul = block.getElementsByTagName("UL")[0];

    if (!ul) {
        return null;
    }

    const links = block.getElementsByTagName("A")
        .map((link) => {
            return {
                href: link.getAttribute("href"),
                text: link.text
            }
        });

    return {
        type: "linkList",
        class: block.getAttribute("class"),
        links: links
    };
}

export {parseSlideshow, parseArticles, parseLinkList};