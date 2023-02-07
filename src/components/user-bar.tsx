import './user-bar.scss';
import { Action } from '../types/Shared';

interface Props {
    balance: number;
    lastAction: Action | null;
}

export const UserBar = (props: Props) => {
    return (
        <div className="user-bar">
            <div>На счету: {props.balance}$</div>
            <div>{props.lastAction?.text}</div>
        </div>
    );
};
