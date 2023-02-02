import { useState } from 'react';

interface Props {
    bet: number;
    gameIsOn: boolean;
    cardsHeld: boolean;
    won: boolean;
    raiseBetCallback: () => void;
    maxBetCallback: () => void;
    dealCallback: () => void;
    replaceCallback: () => void;
    collectCallback: () => void;
}

export const Tools = (props: Props) => {
    const { bet, gameIsOn, cardsHeld, won, raiseBetCallback, maxBetCallback } = props;

    const handleResultButtonClick = () => {
        if (gameIsOn) {
            if (cardsHeld) props.replaceCallback();
            else props.collectCallback();
        } else props.dealCallback();
    };

    return (
        <div>
            <button
                disabled={gameIsOn}
                onClick={raiseBetCallback}
            >
                Изменить ставку
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
            <button onClick={handleResultButtonClick}>
                {cardsHeld ? 'Заменить карты' : gameIsOn ? 'Завершить' : 'Сдать'}
            </button>
        </div>
    );
};
