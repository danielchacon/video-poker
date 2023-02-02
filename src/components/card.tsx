import './card.scss';
import { Card as ICArd } from '../types/Shared';

interface Props {
    card: ICArd;
}

export const Card = (props: Props) => {
    return (
        <div className="card">
            {props.card.rank}
            {props.card.suit.symbol}
        </div>
    );
};
