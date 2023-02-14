import { observer } from 'mobx-react-lite';
import './hand.scss';
import { Card } from './card';
import { IconLock } from './icon-lock';
import { IconUnlock } from './icon-unlock';
import { Card as ICard } from '../types/Shared';
import { gameStore } from '../store/game';

interface Props {
    cardClickCallback: (card: ICard) => void;
}

export const Hand = observer((props: Props) => {
    const { hand, heldCards, ranking, gameIsOn, isDoubleMode, comparedCard } = gameStore.state;

    return (
        <>
            <div className="hand">
                {hand.map((card, index) => {
                    const pressed = heldCards.some(heldCard => heldCard.id === card.id);
                    const disabled = !gameIsOn || (isDoubleMode && index === 0);

                    return (
                        <div
                            className="hand__item"
                            key={`hand-${index}`}
                        >
                            <div className="hand__top">
                                <div
                                    className={`hand__status hand__status--${
                                        pressed ? 'lock' : 'unlock'
                                    }`}
                                >
                                    {pressed ? <IconLock /> : <IconUnlock />}
                                </div>
                            </div>
                            <Card
                                hidden={isDoubleMode && index !== 0 && comparedCard?.id !== card.id}
                                card={card}
                                isHighlighted={
                                    (ranking &&
                                        ranking.cards &&
                                        ranking.cards.some(el => el.id === card.id)) ||
                                    false
                                }
                                disabled={disabled}
                                pressed={pressed}
                                clickable={!disabled}
                                onClickCallback={() => {
                                    if (gameIsOn) props.cardClickCallback(card);
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
});
