import './card.scss';
import { Card as ICArd } from '../types/Shared';

interface Props {
    card: ICArd;
    isHighlighted: boolean;
    clickCallback: () => void;
}

export const Card = (props: Props) => {
    return (
        <div
            className={`card ${props.isHighlighted ? 'card--highlighted' : ''}`}
            onClick={props.clickCallback}
        >
            {props.card.rank}
            {props.card.suit.symbol}
        </div>
    );
};
