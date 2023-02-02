import { useState, useEffect } from 'react';

import { PayTable } from './components/pay-table';
import { CardList } from './components/card-list';
import { Tools } from './components/tools';

import { getNewDeck, shuffleDeck } from './helpers/deck';

import { Card } from './types/Shared';

function App() {
    const [bet, setBet] = useState(1);
    const [cardList, setCardList] = useState<Card[]>([]);
    const [heldCards, setHeldCards] = useState<Card[]>([]);
    const [gameIsOn, setGameIsOn] = useState(false);

    const raiseBet = () => {
        setBet(bet + 1 > 5 ? 1 : bet + 1);
    };

    const handleDeal = () => {
        const deckOfCards = getNewDeck();

        shuffleDeck(deckOfCards);

        const initialCardList = deckOfCards.slice(0, 5);

        setCardList(initialCardList);
        setGameIsOn(true);
    };

    const handleCardClick = (card: Card) => {
        if (heldCards.some(el => el.id === card.id)) {
            setHeldCards(heldCards.filter(el => el.id !== card.id));
        } else setHeldCards([...heldCards, card]);
    };

    return (
        <div>
            <PayTable
                bet={bet}
                gameIsOn={gameIsOn}
                columnClickCallback={bet => setBet(bet)}
            />
            <br></br>
            <CardList
                cardList={cardList}
                heldCards={heldCards}
                cardClickCallback={handleCardClick}
            />
            <br></br>
            <Tools
                bet={bet}
                gameIsOn={gameIsOn}
                cardsHeld={heldCards.length > 0}
                won={false}
                raiseBetCallback={raiseBet}
                maxBetCallback={() => setBet(5)}
                dealCallback={handleDeal}
                replaceCallback={() => {}}
                collectCallback={() => {}}
            />
        </div>
    );
}

export default App;
