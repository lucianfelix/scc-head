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

    let countClass= "cards block";

    if(clazz) {
        countClass += " " + clazz;
    }

    // @ts-ignore
    if(cards.length === 2) {
        countClass += " two";
    }

    // @ts-ignore
    if(cards.length === 3) {
        countClass += " three";
    }

    return (
        <div className={"cards-wrapper"}>
            <div className={countClass}>
                <div>
                {cards.map((card, index) => {
                    // @ts-ignore
                    return <Card data={card} position={index}/>
                })}
                </div>
            </div>
        </div>
    )
}