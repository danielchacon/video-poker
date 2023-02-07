import { useState } from 'react';

import { PayTable } from './components/pay-table';
import { CardList } from './components/card-list';
import { Tools } from './components/tools';
import { UserBar } from './components/user-bar';

import { getDeck, shuffleDeck } from './helpers/deck';
import { checkRankings } from './helpers/rankings';

import { Card, Rankings } from './types/Shared';

import { multipliers } from './constants/multipliers';

function App() {
    const [balance, setBalance] = useState(100);
    const [bet, setBet] = useState(1);
    const [deck, setDeck] = useState<Card[]>([]);
    const [cardList, setCardList] = useState<Card[]>([]);
    const [heldCards, setHeldCards] = useState<Card[]>([]);
    const [gameIsOn, setGameIsOn] = useState(false);

    const raiseBet = () => {
        setBet(bet + 1 > 5 ? 1 : bet + 1);
    };

    const payTheWin = (ranking: Rankings) => {
        setBalance(balance + multipliers[ranking][bet - 1]);
    };

    const handleCardClick = (card: Card) => {
        if (heldCards.some(el => el.id === card.id)) {
            setHeldCards(heldCards.filter(el => el.id !== card.id));
        } else setHeldCards([...heldCards, card]);
    };

    const handleDeal = () => {
        setBalance(balance - bet);

        let deck = getDeck();

        shuffleDeck(deck);

        const initialCardList = deck.slice(0, 5);
        deck = deck.slice(5, deck.length);

        setDeck(deck);
        setCardList(initialCardList);
        setGameIsOn(true);
    };

    const handleReplace = () => {
        const tempCardList: Card[] = [...cardList];
        let tempDeck: Card[] = [...deck];

        for (let card in tempCardList) {
            if (heldCards.some(heldCard => heldCard.id === tempCardList[card].id)) {
                tempCardList[card] = tempDeck[0];

                tempDeck = tempDeck.slice(1, deck.length);
            }
        }

        const ranking = checkRankings(tempCardList);

        if (ranking) payTheWin(ranking);

        setDeck(tempDeck);
        setCardList(tempCardList);
        setHeldCards([]);
        setGameIsOn(false);
    };

    const handleCollect = () => {
        const ranking = checkRankings(cardList);

        if (ranking) payTheWin(ranking);

        setGameIsOn(false);
    };

    return (
        <div>
            <UserBar balance={balance} />
            <br></br>
            <PayTable
                bet={bet}
                gameIsOn={gameIsOn}
                columnClickCallback={bet => setBet(bet)}
            />
            <br></br>
            <CardList
                gameIsOn={gameIsOn}
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
                replaceCallback={handleReplace}
                collectCallback={handleCollect}
            />
        </div>
    );
}

export default App;
