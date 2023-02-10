import { observer } from 'mobx-react-lite';
import { gameStore } from '../store/game';

interface Props {
    raiseBetCallback: () => void;
    maxBetCallback: () => void;
    dealCallback: () => void;
    replaceCallback: () => void;
    doubleCallback: () => void;
}

export const Tools = observer((props: Props) => {
    const { bet, gameIsOn, ranking, isDoubleMode } = gameStore.state;

    const handleResultButtonClick = () => {
        if (gameIsOn) props.replaceCallback();
        else props.dealCallback();
    };

    return (
        <div>
            <button
                disabled={gameIsOn}
                onClick={props.raiseBetCallback}
            >
                Изменить ставку
            </button>
            &nbsp;&nbsp;&nbsp;
            <span>{bet}$</span>
            &nbsp;&nbsp;&nbsp;
            <button
                disabled={gameIsOn}
                onClick={props.maxBetCallback}
            >
                Максимальная ставка
            </button>
            &nbsp;&nbsp;&nbsp;
            <button
                disabled={!(ranking !== null && gameIsOn === false)}
                onClick={props.doubleCallback}
            >
                Удвоить
            </button>
            &nbsp;&nbsp;&nbsp;
            <button disabled={gameIsOn && isDoubleMode} onClick={handleResultButtonClick}>
                {gameIsOn && !isDoubleMode ? 'Заменить карты' : 'Сдать'}
            </button>
        </div>
    );
});
