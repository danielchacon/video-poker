import { makeAutoObservable } from 'mobx';
import { Card, WinRanking, Action } from '../types/Shared';
import { baseBet } from '../constants/baseBet';

interface State {
    bet: number;
    balance: number;
    deck: Card[];
    cardList: Card[];
    heldCards: Card[];
    gameIsOn: boolean;
    winRanking: WinRanking | null;
    lastAction: Action | null;
}

class GameStore {
    state: State = {
        bet: baseBet,
        balance: 100,
        deck: [],
        cardList: [],
        heldCards: [],
        gameIsOn: false,
        winRanking: null,
        lastAction: null,
    };

    constructor() {
        makeAutoObservable(this);
    }

    updateState(payload: State) {
        this.state = payload;
    }
}
export const gameStore = new GameStore();
