import { useState } from 'react';

import { PayTable } from './components/pay-table';
import { CardList } from './components/card-list';
import { Tools } from './components/tools';

import { getNewDeck, shuffleDeck } from './helpers/deck';

import { Card } from './types/Shared';

function App() {
    const [bet, setBet] = useState(1);
    const [cardList, setCardList] = useState<Card[]>([]);

    const raiseBet = () => {
        setBet(bet + 1 > 5 ? 1 : bet + 1);
    };

    const handleDeal = () => {
        const deckOfCards = getNewDeck();

        shuffleDeck(deckOfCards);

        const initialCardList = deckOfCards.slice(0, 5);
        
        setCardList(initialCardList);
    };

    return (
        <div>
            <PayTable
                bet={bet}
                columnClickCallback={bet => setBet(bet)}
            />
            <br></br>
            <CardList cardList={cardList}/>
            <br></br>
            <Tools
                bet={bet}
                gameIsOn={false}
                cardsHeld={false}
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
