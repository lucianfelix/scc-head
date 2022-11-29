'use server';

export function GenericBlock(props) {
    const { type, id, content, 'class': clazz } = props.data;

    const Container = `${type.toLowerCase()}`;
    return (<>
        <Container className={clazz} id={id} dangerouslySetInnerHTML={{ __html: content }}/>
    </>);
}