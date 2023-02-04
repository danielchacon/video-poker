export enum SuitNames {
    CLUBS = 'Clubs',
    DIAMONDS = 'Diamonds',
    HEARTS = 'Hearts',
    SPADES = 'Spades',
}

export enum SuitSymbols {
    CLUBS = '♣',
    DIAMONDS = '♦',
    HEARTS = '♥',
    SPADES = '♠',
}

export enum RankNames {
    JACK = 'Jack',
    QUEEN = 'Queen',
    KING = 'King',
    ACE = 'Ace',
}

export interface Suit {
    name: SuitNames;
    symbol: SuitSymbols;
}

export type Rank = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | RankNames;

export interface Card {
    id: number;
    rank: Rank;
    suit: Suit;
    weight: number;
}

export enum Rankings {
    STRAIGHT = 'Straight',
    FOUR_OF_A_KIND = 'Four of a Kind',
    FULL_HOUSE = 'Full House',
    THREE_OF_A_KIND = 'Three of a Kind',
    TWO_PAIRS = 'Two Pairs',
    JACKS_OR_BETTER = 'Jacks or Better',
}
