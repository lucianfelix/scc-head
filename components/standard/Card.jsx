'use server';

export function Card(props) {
    const { content, 'class': clazz } = props.data;

    return (
        <div className={"card " + clazz} dangerouslySetInnerHTML={{ __html: content }}/>
    );
}