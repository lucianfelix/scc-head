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

    const Container = `${type.toLowerCase()}`;
    // @ts-ignore
    return (<>
        <Container className={clazz} id={id} dangerouslySetInnerHTML={{ __html: content }}/>
    </>);
}