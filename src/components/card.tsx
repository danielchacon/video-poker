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
    const { isHighlighted, disabled, pressed, hidden, clickable, card, onClickCallback } = props;

    return (
        <div
            className={`card ${isHighlighted ? 'card--highlighted' : ''} ${
                disabled ? 'card--disabled' : ''
            } ${pressed ? 'card--pressed' : ''} ${clickable ? 'card--clickable' : ''} ${
                hidden ? 'card--hidden' : ''
            }`}
            onClick={onClickCallback}
            role="button"
            tabIndex={0}
        >
            <div
                className={`card__name ${
                    (card.suit.name === SuitNames.DIAMONDS ||
                        card.suit.name === SuitNames.HEARTS) &&
                    'card__name--red'
                }`}
            >
                {hidden ? (
                    '?'
                ) : (
                    <>
                        {+card.rank > 0 ? card.rank : card.rank.toString().charAt(0)}
                        {card.suit.symbol}
                    </>
                )}
            </div>
        </div>
    );
};
