import { Rankings } from '../types/Shared';

export const multipliers = {
    [Rankings.JACKS_OR_BETTER]: [1, 2, 3, 4, 5],
    [Rankings.TWO_PAIRS]: [2, 4, 6, 8, 10],
    [Rankings.THREE_OF_A_KIND]: [3, 6, 9, 12, 15],
    [Rankings.STRAIGHT]: [4, 8, 12, 16, 20],
    [Rankings.FLUSH]: [6, 12, 18, 24, 30],
    [Rankings.FULL_HOUSE]: [9, 18, 27, 36, 45],
    [Rankings.FOUR_OF_A_KIND]: [25, 50, 75, 100, 125],
    [Rankings.STRAIGHT_FLUSH]: [50, 100, 150, 200, 250],
    [Rankings.ROYAL_FLUSH]: [250, 500, 750, 1000, 4000],
};
