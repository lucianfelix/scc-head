'use server';

export function Column(props) {
    const { content, 'class': clazz } = props.data;

    return (
        <div className={"column " + clazz} dangerouslySetInnerHTML={{ __html: content }}/>
    );
}