import { SuitNames, SuitSymbols, Suit, Rank, RankNames, Card } from '../types/Shared';

export const getNewDeck = (): Card[] => {
    const suits: Suit[] = [
        {
            name: SuitNames.HEARTS,
            symbol: SuitSymbols.HEARTS,
        },
        {
            name: SuitNames.CLUBS,
            symbol: SuitSymbols.CLUBS,
        },
        {
            name: SuitNames.DIAMONDS,
            symbol: SuitSymbols.DIAMONDS,
        },
        {
            name: SuitNames.SPADES,
            symbol: SuitSymbols.SPADES,
        },
    ];
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
        RankNames.KING,
    ];
    let cards: Card[] = [];

    for (let suit in suits) {
        for (let rank in ranks) {
            cards.push({
                rank: ranks[rank],
                suit: suits[suit],
            });
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
