import { makeAutoObservable } from 'mobx';
import { Card, Ranking } from '../types/Shared';
import { baseBet, baseBalance } from '../constants/settings';

interface State {
    bet: number;
    balance: number;
    gameIsOn: boolean;
    isDoubleMode: boolean;
    comparedCard: Card | null;
    deck: Card[];
    hand: Card[];
    heldCards: Card[];
    ranking: Ranking | null;
    log: number[];
}

const statePlaceholder: State = {
    bet: baseBet,
    balance: baseBalance,
    gameIsOn: false,
    isDoubleMode: false,
    comparedCard: null,
    deck: [],
    hand: [],
    heldCards: [],
    ranking: null,
    log: [],
};

class GameStore {
    state: State = statePlaceholder;

    constructor() {
        makeAutoObservable(this);
    }

    updateState(payload: Partial<State>) {
        this.state = {
            ...this.state,
            ...payload,
        };
    }

    reset() {
        this.updateState({
            ...statePlaceholder,
            bet: this.state.bet,
            balance: this.state.balance,
            log: this.state.log
        })
    }
}
export const gameStore = new GameStore();
