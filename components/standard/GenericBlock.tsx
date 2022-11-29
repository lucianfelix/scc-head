'use server';

export type GenericBlockProps = {
    data: {
        type: string,
        id: string,
        'class': string,
        content: string
    }
}

export function GenericBlock({data} : GenericBlockProps) {
    const { type, id, content, 'class': clazz } = data;

    if (!content) {
        return null;
    }

    const Container:any = `${type.toLowerCase()}`;
    // @ts-ignore
    return (
        <div className={"default-content-wrapper"}>
            <Container className={clazz} id={id} dangerouslySetInnerHTML={{ __html: content }}/>
        </div>
    );
}