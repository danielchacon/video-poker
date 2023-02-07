import { useEffect, useState } from 'react';

import { PayTable } from './components/pay-table';
import { CardList } from './components/card-list';
import { Tools } from './components/tools';
import { UserBar } from './components/user-bar';

import { getDeck, shuffleDeck } from './helpers/deck';
import { checkRankings } from './helpers/rankings';

import { Card, Rankings, WinRanking, Action } from './types/Shared';

import { multipliers } from './constants/multipliers';

function App() {
    const [balance, setBalance] = useState(100);
    const [bet, setBet] = useState(1);
    const [deck, setDeck] = useState<Card[]>([]);
    const [cardList, setCardList] = useState<Card[]>([]);
    const [heldCards, setHeldCards] = useState<Card[]>([]);
    const [gameIsOn, setGameIsOn] = useState(false);
    const [winRanking, setWinRanking] = useState<WinRanking | null>(null);
    const [lastAction, setLastAction] = useState<Action | null>(null);

    const raiseBet = () => {
        setBet(bet + 1 > 5 ? 1 : bet + 1);
    };

    const payTheWin = (ranking: Rankings) => {
        const win = multipliers[ranking][bet - 1];

        setBalance(balance + win);
        setLastAction({
            type: 'win',
            text: `+${win}$`,
        });
    };

    const deal = () => {
        setBalance(balance - bet);
        setLastAction({
            type: 'bet',
            text: `-${bet}$`,
        });

        let deck = getDeck();

        shuffleDeck(deck);

        const initialCardList = deck.slice(0, 5);
        deck = deck.slice(5, deck.length);

        const ranking = checkRankings(initialCardList);

        setWinRanking(ranking || null);
        setDeck(deck);
        setHeldCards([]);
        setCardList(initialCardList);
        setGameIsOn(true);
    };

    const handleMaxBet = () => {
        setBet(5);
        deal();
    };

    const handleCardClick = (card: Card) => {
        if (heldCards.some(el => el.id === card.id)) {
            setHeldCards(heldCards.filter(el => el.id !== card.id));
        } else setHeldCards([...heldCards, card]);
    };

    const handleReplace = () => {
        const tempCardList: Card[] = [...cardList];
        let tempDeck: Card[] = [...deck];

        for (let i = 0; i < tempCardList.length; i++) {
            if (!heldCards.some(heldCard => heldCard.id === tempCardList[i].id)) {
                tempCardList[i] = tempDeck[0];

                tempDeck = tempDeck.slice(1, deck.length);
            }
        }

        const ranking = checkRankings(tempCardList);

        setWinRanking(ranking || null);

        if (ranking) payTheWin(ranking.name);

        setDeck(tempDeck);
        setCardList(tempCardList);        
        setGameIsOn(false);
    };

    return (
        <div>
            <UserBar
                balance={balance}
                lastAction={lastAction}
            />
            <br></br>
            <PayTable
                bet={bet}
                gameIsOn={gameIsOn}
                winRanking={winRanking}
                columnClickCallback={bet => setBet(bet)}
            />
            <br></br>
            <CardList
                gameIsOn={gameIsOn}
                cardList={cardList}
                heldCards={heldCards}
                winRanking={winRanking}
                cardClickCallback={handleCardClick}
            />
            <br></br>
            <Tools
                bet={bet}
                gameIsOn={gameIsOn}
                cardsHeld={heldCards.length > 0}
                won={false}
                raiseBetCallback={raiseBet}
                maxBetCallback={handleMaxBet}
                dealCallback={deal}
                replaceCallback={handleReplace}
            />
        </div>
    );
}

export default App;
