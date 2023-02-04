import { Card, RankNames, Rankings } from '../types/Shared';
import { createCard, suitMap } from './deck';

const sortCards = (cards: Card[]) => {
    cards.sort((a: Card, b: Card) => a.weight - b.weight);
};

export const checkIsOneValueCombo = (cards: Card[]) => {
    sortCards(cards);

    let chunkedArray: Card[][] = [];

    for (let i = 0; i < cards.length; i++) {
        let currentElement = cards[i];

        if (
            chunkedArray.length === 0 ||
            !chunkedArray[chunkedArray.length - 1].some(el => el.rank === currentElement.rank)
        ) {
            chunkedArray.push([currentElement]);
        } else {
            chunkedArray[chunkedArray.length - 1].push(currentElement);
        }
    }

    chunkedArray = chunkedArray.filter(el => el.length > 1);

    if (chunkedArray.length === 1) {
        if (chunkedArray[0].length === 2 && typeof chunkedArray[0][0].rank === 'string') {
            return Rankings.JACKS_OR_BETTER;
        } else if (chunkedArray[0].length === 3) {
            return Rankings.THREE_OF_A_KIND;
        } else if (chunkedArray[0].length === 4) {
            return Rankings.FOUR_OF_A_KIND;
        }
    } else if (chunkedArray.length === 2) {
        const pairs = chunkedArray.filter(el => el.length === 2);

        if (pairs.length === 2) {
            return Rankings.TWO_PAIRS;
        } else if (pairs.length === 1) {
            return Rankings.FULL_HOUSE;
        }
    }

    return null;
};

const checkIsConsecutive = (cards: Card[]) => {
    let isConsecutive = true;

    for (let i = 0; i < cards.length - 1; i++) {
        if (cards[i].weight !== cards[i + 1].weight - 1) {
            isConsecutive = false;
        }
    }

    return isConsecutive;
};

const checkIsStraightCombo = (cards: Card[]) => {
    sortCards(cards);

    let isStraight = false;

    const hasAce = cards.some(el => el.rank === RankNames.ACE);

    if (hasAce) {
        const tempCards: Card[] = JSON.parse(JSON.stringify(cards));
        const aceCard = tempCards.find(el => el.rank === RankNames.ACE);

        if (aceCard) aceCard.weight = 1;        

        sortCards(tempCards);        

        isStraight = checkIsConsecutive(tempCards);
    }

    if (!isStraight) isStraight = checkIsConsecutive(cards);

    console.log(cards, isStraight);

    if (isStraight) return Rankings.STRAIGHT;
};

export const checkRankings = (cards: Card[]) => {
    if (cards.length !== 5) return null;

    const isOneValueCombo = checkIsOneValueCombo(cards);

    console.log('isOneValueCombo', isOneValueCombo);

    if (!isOneValueCombo)
        checkIsStraightCombo([
            createCard(RankNames.ACE, suitMap.clubs),
            createCard(RankNames.JACK, suitMap.clubs),
            createCard(RankNames.QUEEN, suitMap.clubs),
            createCard(RankNames.KING, suitMap.clubs),
            createCard(9, suitMap.clubs),
        ]);

    // console.log(isOneValueCombo);
};
