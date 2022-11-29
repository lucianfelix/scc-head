'use server';

import {Card, CardProps} from "./Card";

type CardContainerProps = {
    data: {
        type: "card",
        'class': string,
        cards: [CardProps]
    }
}

export function CardContainer({data}: CardContainerProps) {
    const { type, 'class': clazz, cards } = data;

    let countClass= "";

    if(cards.length === 2) {
        countClass = "two";
    }

    return (
        <div className={"columns-wrapper"}>
            <div className={"columns " + countClass + " " + clazz}>
                {cards.map((card, index) => {
                    return <Card data={card} position={index}/>
                })}
            </div>
        </div>
    )
}