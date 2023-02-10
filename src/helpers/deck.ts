import { SuitNames, SuitSymbols, Suit, Rank, RankNames, Card } from '../types/Shared';

const getCardWeight = (rank: Rank): number => {
    if (rank === RankNames.ACE) return 14;
    else if (rank === RankNames.KING) return 13;
    else if (rank === RankNames.QUEEN) return 12;
    else if (rank === RankNames.JACK) return 11;
    else return rank;
};

export const createCard = (rank: Rank, suit: Suit) => {
    return {
        id: Math.floor(Math.random() * 10000),
        rank,
        suit,
        weight: getCardWeight(rank),
    };
};

export const suitMap = {
    hearts: {
        name: SuitNames.HEARTS,
        symbol: SuitSymbols.HEARTS,
    },
    clubs: {
        name: SuitNames.CLUBS,
        symbol: SuitSymbols.CLUBS,
    },
    diamonds: {
        name: SuitNames.DIAMONDS,
        symbol: SuitSymbols.DIAMONDS,
    },
    spades: {
        name: SuitNames.SPADES,
        symbol: SuitSymbols.SPADES,
    },
};

export const createDeck = (): Card[] => {
    const suits: Suit[] = [suitMap.hearts, suitMap.clubs, suitMap.diamonds, suitMap.spades];
    const ranks: Rank[] = [
        RankNames.ACE,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        RankNames.JACK,
        RankNames.QUEEN,
    ];
    let cards: Card[] = [];

    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < ranks.length; j++) {
            cards.push(createCard(ranks[j], suits[i]));
        }
    }

    return cards;
};

export const shuffleDeck = (deck: Card[]) => {
    let currentIndex = deck.length;

    while (0 !== currentIndex) {
        let randomIndex = Math.floor(Math.random() * currentIndex);

        currentIndex -= 1;

        let tempValue = deck[currentIndex];

        deck[currentIndex] = deck[randomIndex];

        deck[randomIndex] = tempValue;
    }
};
