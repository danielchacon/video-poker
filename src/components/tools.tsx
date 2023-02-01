import { useState } from 'react';

interface Props {
    bet: number;
    gameIsOn: boolean;
    cardsHeld: boolean;
    won: boolean;
    raiseBetCallback: () => void;
    maxBetCallback: () => void;
}

export const Tools = (props: Props) => {
    const { bet, gameIsOn, cardsHeld, won, raiseBetCallback, maxBetCallback } = props;

    return (
        <div>
            <button
                disabled={gameIsOn}
                onClick={raiseBetCallback}
            >
                Увеличить ставку
            </button>
            &nbsp;&nbsp;&nbsp;
            <span>{bet}$</span>
            &nbsp;&nbsp;&nbsp;
            <button
                disabled={gameIsOn}
                onClick={maxBetCallback}
            >
                Максимальная ставка
            </button>
            &nbsp;&nbsp;&nbsp;
            {won && <button>Удвоить</button>}
            &nbsp;&nbsp;&nbsp;
            <button>{cardsHeld ? 'Заменить карты' : 'Сдать'}</button>
        </div>
    );
};
