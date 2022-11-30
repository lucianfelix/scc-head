'use server';

export function Column(props) {
    const { content, 'class': clazz } = props.data;
    const { index } = props.index;

    if (!content) {
        return null;
    }

    let columnClass = "column columns-content";
    if(clazz) {
        columnClass+= " " + clazz;
    }

    if(index === 0) {
        columnClass+= " columns-left";
    }

    if(index === 1) {
        columnClass+= " columns-right";
    }

    return (
        <div className={columnClass}><div
                className={"columns-content-wrapper"}
                dangerouslySetInnerHTML={{ __html: content }}
            /></div>
    );
}