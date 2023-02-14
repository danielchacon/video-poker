import './card.scss';
import { Card as ICArd, SuitNames } from '../types/Shared';

interface Props {
    card: ICArd;
    isHighlighted: boolean;
    hidden: boolean;
    disabled: boolean;
    pressed: boolean;
    clickable: boolean;
    onClickCallback: () => void;
}

export const Card = (props: Props) => {
    return (
        <div
            className={`card ${props.isHighlighted ? 'card--highlighted' : ''} ${
                props.disabled ? 'card--disabled' : ''
            } ${props.pressed ? 'card--pressed' : ''} ${props.clickable ? 'card--clickable' : ''} ${
                props.hidden ? 'card--hidden' : ''
            }`}
            onClick={props.onClickCallback}
            role="button"
            tabIndex={0}
        >
            <div
                className={`card__name ${
                    props.card.suit.name === SuitNames.DIAMONDS ||
                    props.card.suit.name === SuitNames.HEARTS
                        ? 'card__name--red'
                        : ''
                }`}
            >
                {props.hidden ? (
                    '?'
                ) : (
                    <>
                        {+props.card.rank > 0
                            ? props.card.rank
                            : props.card.rank.toString().charAt(0)}
                        {props.card.suit.symbol}
                    </>
                )}
            </div>
        </div>
    );
};
