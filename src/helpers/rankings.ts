import { Card, RankNames, Rankings, Ranking } from '../types/Shared';

type CheckRankingResult = Ranking | undefined;

const sortCards = (cards: Card[]) => {
    cards.sort((a: Card, b: Card) => a.weight - b.weight);
};

export const checkIsOneValueCombo = (cards: Card[]): CheckRankingResult => {
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
            return {
                name: Rankings.JACKS_OR_BETTER,
                cards: chunkedArray[0],
            };
        } else if (chunkedArray[0].length === 3) {
            return {
                name: Rankings.THREE_OF_A_KIND,
                cards: chunkedArray[0],
            };
        } else if (chunkedArray[0].length === 4) {
            return {
                name: Rankings.FOUR_OF_A_KIND,
                cards: chunkedArray[0],
            };
        }
    } else if (chunkedArray.length === 2) {
        const pairs = chunkedArray.filter(el => el.length === 2);

        if (pairs.length === 2) {
            return {
                name: Rankings.TWO_PAIRS,
                cards: [...pairs[0], ...pairs[1]],
            };
        } else if (pairs.length === 1) {
            return {
                name: Rankings.FULL_HOUSE,
            };
        }
    }
};

const checkIsConsecutive = (cards: Card[]): boolean => {
    let isConsecutive = true;

    for (let i = 0; i < cards.length - 1; i++) {
        if (cards[i].weight !== cards[i + 1].weight - 1) {
            isConsecutive = false;
        }
    }

    return isConsecutive;
};

const checkIsFlush = (cards: Card[]): CheckRankingResult => {
    if (cards.every(card => card.suit.name === cards[0].suit.name))
        return {
            name: Rankings.FLUSH,
        };
};

const checkIsStraightCombo = (cards: Card[], isFlush: boolean): CheckRankingResult => {
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
            if (tempCards[4].rank === RankNames.ACE)
                return {
                    name: Rankings.ROYAL_FLUSH,
                };
            else
                return {
                    name: Rankings.STRAIGHT_FLUSH,
                };
        } else
            return {
                name: Rankings.STRAIGHT,
            };
    }
};

export const checkRankings = (cards: Card[]): CheckRankingResult => {
    if (cards.length !== 5) return;

    const isFlush = checkIsFlush(cards);

    const isStraightCombo = checkIsStraightCombo(cards, !!isFlush);

    if (
        isStraightCombo &&
        (isStraightCombo.name === Rankings.ROYAL_FLUSH ||
            isStraightCombo.name === Rankings.STRAIGHT_FLUSH)
    )
        return isStraightCombo;

    const isOneValueCombo = checkIsOneValueCombo(cards);

    if (isOneValueCombo && isOneValueCombo.name === Rankings.FOUR_OF_A_KIND) return isOneValueCombo;
    if (isFlush) return isFlush;
    if (isStraightCombo && isStraightCombo.name === Rankings.STRAIGHT) return isStraightCombo;
    if (isOneValueCombo) return isOneValueCombo;
};
