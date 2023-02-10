import './user-bar.scss';
import { observer } from 'mobx-react-lite';
import { gameStore } from '../store/game';

export const UserBar = observer(() => {
    const { balance, log } = gameStore.state;

    const lastAction = log[log.length - 1];

    return (
        <div className="user-bar">
            <div>На счету: {balance}$</div>
            {lastAction && (<div>{lastAction > 0 ? '+' + lastAction : lastAction}$</div>)}
        </div>
    );
});
