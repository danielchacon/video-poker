import './user-bar.scss';
import { observer } from 'mobx-react-lite';
import { gameStore } from '../store/game';

export const UserBar = observer(() => {
    const { balance } = gameStore.state;

    return (
        <div className="user-bar">
            {balance}$
        </div>
    );
});
