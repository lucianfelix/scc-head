'use server';

export type CardProps = {
    data: {
        type: "card",
        'class': string,
        content: string
    }
}
export function Card({data} : CardProps) {
    const { content, 'class': clazz } = data;

    if (!content) {
        return null;
    }

    return (
        <div className={"card " + clazz} dangerouslySetInnerHTML={{ __html: content }}/>
    );
}