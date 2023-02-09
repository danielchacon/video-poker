import './user-bar.scss';
import { observer } from 'mobx-react-lite';
import { gameStore } from '../store/game';

export const UserBar = observer(() => {
    const { balance, lastAction } = gameStore.state;

    return (
        <div className="user-bar">
            <div>На счету: {balance}$</div>
            <div>{lastAction?.text}</div>
        </div>
    );
});
