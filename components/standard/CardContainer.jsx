'use server';

import {Card} from "./Card";

export function CardContainer({data}) {
    const { type, 'class': clazz, cards } = data;

    return (
        <div className={"card-container " + clazz}>
            {cards.map((card, index) => {
                return <Card data={card}/>
            })}
        </div>
    )
}