'use server';

export type CardProps = {
    data: {
        type: "card",
        'class': string,
        content: string
        picture: any
    }
}
export function Card({data} : CardProps) {
    const { content, 'class': clazz, picture } = data;

    if (!content) {
        return null;
    }

    return (
        <div className={"cards-card"}>
        <div
            className={"cards-card-details"}
            dangerouslySetInnerHTML={{ __html: content }}/>
        </div>
    );
}