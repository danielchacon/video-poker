import { observer } from 'mobx-react-lite';
import './card-list.scss';
import { Card } from './card';
import { Card as ICard } from '../types/Shared';
import { gameStore } from '../store/game';

interface Props {
    cardClickCallback: (card: ICard) => void;
}

export const CardList = observer((props: Props) => {
    const { cardList, heldCards, winRanking, gameIsOn } = gameStore.state;

    return (
        <div className="card-list">
            {cardList.map((card, index) => (
                <div key={index}>
                    <div>
                        {heldCards.some(heldCard => heldCard.id === card.id) ? 'Фикс' : 'Не-фикс'}
                    </div>
                    <Card
                        card={card}
                        isHighlighted={
                            (winRanking &&
                                winRanking.cards &&
                                winRanking.cards.some(el => el.id === card.id)) ||
                            false
                        }
                        clickCallback={() => {
                            if (gameIsOn) props.cardClickCallback(card);
                        }}
                    />
                </div>
            ))}
        </div>
    );
});
