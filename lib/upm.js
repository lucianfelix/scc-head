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

    const source = picture?.childNodes.find((c) => c.tagName === "SOURCE");
    const img = picture?.childNodes.find((c) => c.tagName === "IMG");
    const width = img?.getAttribute("width");
    const height = img?.getAttribute("height");
    let pictureUrl = img?.getAttribute("src");
    if(!pictureUrl) {
        pictureUrl = source?.getAttribute("srcset")?.split(" ")[0];
    }

    /*
    <picture><source type="image/webp" srcset="https://main--upm--hlxsites.hlx.live/media_1b0a9abb5fd97958342f83943585198d71d7cd0bf.png?width=2000&format=webply&optimize=medium" media="(min-width: 400px)"><source type="image/webp" srcset="https://main--upm--hlxsites.hlx.live/media_1b0a9abb5fd97958342f83943585198d71d7cd0bf.png?width=750&format=webply&optimize=medium"><source type="image/png" srcset="https://main--upm--hlxsites.hlx.live/media_1b0a9abb5fd97958342f83943585198d71d7cd0bf.png?width=2000&format=png&optimize=medium" media="(min-width: 400px)"><img loading="lazy" alt="" type="image/png" src="./media_1b0a9abb5fd97958342f83943585198d71d7cd0bf.png?width=750&#x26;format=png&#x26;optimize=medium" width="1338" height="411"></picture>
     */

    return {
        type: "slide",
        class: block.getAttribute("class"),
        picture: picture.outerHTML,
        pictureUrl: pictureUrl,
        width: width,
        height: height,
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
