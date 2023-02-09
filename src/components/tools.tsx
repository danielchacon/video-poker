import { observer } from 'mobx-react-lite';
import { gameStore } from '../store/game';

interface Props {
    raiseBetCallback: () => void;
    maxBetCallback: () => void;
    dealCallback: () => void;
    replaceCallback: () => void;
}

export const Tools = observer((props: Props) => {
    const { bet, gameIsOn, lastAction } = gameStore.state;

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
            {lastAction?.type === 'win' && <button>Удвоить</button>}
            &nbsp;&nbsp;&nbsp;
            <button onClick={handleResultButtonClick}>
                {gameIsOn ? 'Заменить карты' : 'Сдать'}
            </button>
        </div>
    );
});
