import './card-list.scss';
import { Card } from './card';
import { Card as ICard } from '../types/Shared';

interface Props {
    gameIsOn: boolean;
    cardList: ICard[];
    heldCards: ICard[];
    cardClickCallback: (card: ICard) => void;
}

export const CardList = (props: Props) => {
    return (
        <div className="card-list">
            {props.cardList.map((card, index) => (
                <div key={index}>
                    <div>
                        {props.heldCards.some(heldCard => heldCard.id === card.id)
                            ? 'Фикс'
                            : 'Не-фикс'}
                    </div>
                    <Card
                        card={card}
                        clickCallback={() => {
                            if (props.gameIsOn) props.cardClickCallback(card);
                        }}
                    />
                </div>
            ))}
        </div>
    );
};
