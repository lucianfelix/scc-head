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

    return (
        <div className={"cards-card"}>
            {picture && <picture dangerouslySetInnerHTML={{ __html: picture }}/>}
            {content && <div className={"cards-card-details"} dangerouslySetInnerHTML={{ __html: content }}/>}
        </div>
    );
}