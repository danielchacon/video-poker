import './card.scss';
import { Card as ICArd } from '../types/Shared';

interface Props {
    card: ICArd;
    clickCallback: () => void;
}

export const Card = (props: Props) => {
    return (
        <div className="card" onClick={props.clickCallback}>
            {props.card.rank}
            {props.card.suit.symbol}
        </div>
    );
};
