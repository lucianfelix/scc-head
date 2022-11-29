'use server';

export function Column(props) {
    const { content, 'class': clazz } = props.data;
    const { index } = props.index;

    let columnClass = "column   columns-content";
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
        <div className={"column " + columnClass}>
            <div
                className={"columns-content-wrapper"}
                dangerouslySetInnerHTML={{ __html: content }}/>
        </div>
    );
}