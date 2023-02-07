import { Card, RankNames, Rankings } from '../types/Shared';

const sortCards = (cards: Card[]) => {
    cards.sort((a: Card, b: Card) => a.weight - b.weight);
};

export const checkIsOneValueCombo = (cards: Card[]) => {
    const tempCards: Card[] = [...cards];

    sortCards(tempCards);

    let chunkedArray: Card[][] = [];

    for (let i = 0; i < tempCards.length; i++) {
        let currentElement = tempCards[i];

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

    return false;
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

const checkIsSameSuit = (cards: Card[]) => {
    if (cards.every(card => card.suit.name === cards[0].suit.name)) return Rankings.FLUSH;
    return false;
};

const checkIsStraightCombo = (cards: Card[], isFlush: boolean) => {
    const tempCards: Card[] = [...cards];

    sortCards(tempCards);

    let isStraight = false;

    const hasAce = cards.some(el => el.rank === RankNames.ACE);

    if (hasAce) {
        const tempCardsAceFirst: Card[] = JSON.parse(JSON.stringify(cards));
        const aceCard = tempCardsAceFirst.find(el => el.rank === RankNames.ACE);

        if (aceCard) aceCard.weight = 1;

        sortCards(tempCardsAceFirst);

        isStraight = checkIsConsecutive(tempCardsAceFirst);
    }

    if (!isStraight) isStraight = checkIsConsecutive(tempCards);

    if (isStraight) {
        if (isFlush) {
            if (tempCards[4].rank === RankNames.ACE) return Rankings.ROYAL_FLUSH;
            else return Rankings.STRAIGHT_FLUSH;
        } else return Rankings.STRAIGHT;
    }

    return false;
};

export const checkRankings = (cards: Card[]) => {
    if (cards.length !== 5) return null;

    const isFlush = checkIsSameSuit(cards);

    const isStraightCombo = checkIsStraightCombo(cards, !!isFlush);

    if (
        isStraightCombo &&
        (isStraightCombo === Rankings.ROYAL_FLUSH || isStraightCombo === Rankings.STRAIGHT_FLUSH)
    ) return isStraightCombo;

    const isOneValueCombo = checkIsOneValueCombo(cards);

    if (isOneValueCombo && isOneValueCombo === Rankings.FOUR_OF_A_KIND) return isOneValueCombo;
    if (isFlush) return isFlush;
    if (isStraightCombo && isStraightCombo === Rankings.STRAIGHT) return isStraightCombo;
    if (isOneValueCombo) return isOneValueCombo;

    return false;
};
