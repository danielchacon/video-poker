import { observer } from 'mobx-react-lite';
import './hand.scss';
import { Card } from './card';
import { Card as ICard } from '../types/Shared';
import { gameStore } from '../store/game';

interface Props {
    cardClickCallback: (card: ICard) => void;
}

export const Hand = observer((props: Props) => {
    const { hand, heldCards, ranking, gameIsOn, isDoubleMode, comparedCard } = gameStore.state;

    return (
        <>
            {gameIsOn && !isDoubleMode && (
                <div>Отметьте карты, которые не хотите заменять</div>
            )}
            {gameIsOn && isDoubleMode && (
                <div>Угадайте карту, которая будет старше открытой по достоинству</div>
            )}
            <div className="card-list">
                {hand.map((card, index) => (
                    <div key={index}>
                        <div>
                            {heldCards.some(heldCard => heldCard.id === card.id)
                                ? 'Фикс'
                                : 'Не-фикс'}
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
                            clickCallback={() => {
                                if (gameIsOn) props.cardClickCallback(card);
                            }}
                        />
                    </div>
                ))}
            </div>
        </>
    );
});
