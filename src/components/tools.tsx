import './tools.scss';
import { observer } from 'mobx-react-lite';
import { Button } from './button';
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
        <div className="tools">
            <div className="tools__item">
                <Button
                    disabled={gameIsOn}
                    onClickCallback={props.raiseBetCallback}
                >
                    Ставка
                </Button>
            </div>
            <div className="tools__item">
                <div className="tools__bet">{bet}$</div>
            </div>
            <div className="tools__item">
                <Button
                    theme="alert"
                    disabled={gameIsOn}
                    onClickCallback={props.maxBetCallback}
                >
                    Макс.
                </Button>
            </div>
            <div className="tools__item">
                <Button
                    disabled={!(ranking !== null && gameIsOn === false)}
                    onClickCallback={props.doubleCallback}
                >
                    Удвоить
                </Button>
            </div>
            <div className="tools__item">
                <Button
                    theme="primary"
                    disabled={gameIsOn && isDoubleMode}
                    onClickCallback={handleResultButtonClick}
                >
                    {gameIsOn && !isDoubleMode ? 'Заменить' : 'Сдать'}
                </Button>
            </div>
        </div>
    );
});
