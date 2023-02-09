import { observer } from 'mobx-react-lite';
import { PayTable } from './components/pay-table';
import { CardList } from './components/card-list';
import { Tools } from './components/tools';
import { UserBar } from './components/user-bar';
import { getDeck, shuffleDeck } from './helpers/deck';
import { checkRankings } from './helpers/rankings';
import { Card, Rankings } from './types/Shared';
import { multipliers } from './constants/multipliers';
import { gameStore } from './store/game';

const App = observer(() => {
    const { balance, bet, heldCards, cardList, deck } = gameStore.state;

    const raiseBet = () => {
        gameStore.updateState({
            ...gameStore.state,
            bet: bet + 1 > 5 ? 1 : bet + 1,
        });
    };

    const payTheWin = (ranking: Rankings) => {
        const win = multipliers[ranking][gameStore.state.bet - 1];

        gameStore.updateState({
            ...gameStore.state,
            balance: balance + win,
            lastAction: {
                type: 'win',
                text: `+${win}$`,
            },
        });
    };

    const deal = () => {
        gameStore.updateState({
            ...gameStore.state,
            balance: balance - bet,
            lastAction: {
                type: 'bet',
                text: `-${bet}$`,
            },
        });

        let tempDeck = getDeck();

        shuffleDeck(tempDeck);

        const tempCardList = tempDeck.slice(0, 5);
        tempDeck = tempDeck.slice(5, tempDeck.length);

        const ranking = checkRankings(tempCardList);

        gameStore.updateState({
            ...gameStore.state,
            winRanking: ranking || null,
            deck: tempDeck,
            cardList: tempCardList,
            heldCards: [],
            gameIsOn: true,
        });
    };

    const handleMaxBet = () => {
        gameStore.updateState({
            ...gameStore.state,
            bet: 5,
        });

        deal();
    };

    const handleCardClick = (card: Card) => {
        if (heldCards.some(el => el.id === card.id)) {
            gameStore.updateState({
                ...gameStore.state,
                heldCards: heldCards.filter(el => el.id !== card.id),
            });
        } else {
            gameStore.updateState({
                ...gameStore.state,
                heldCards: [...heldCards, card],
            });
        }
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

        gameStore.updateState({
            ...gameStore.state,
            winRanking: ranking || null,
        });

        if (ranking) payTheWin(ranking.name);

        gameStore.updateState({
            ...gameStore.state,
            deck: tempDeck,
            cardList: tempCardList,
            gameIsOn: false,
        });
    };

    return (
        <div>
            <UserBar />
            <br></br>
            <PayTable
                columnClickCallback={bet => {
                    gameStore.updateState({
                        ...gameStore.state,
                        bet,
                    });
                }}
            />
            <br></br>
            <CardList cardClickCallback={handleCardClick} />
            <br></br>
            <Tools
                raiseBetCallback={raiseBet}
                maxBetCallback={handleMaxBet}
                dealCallback={deal}
                replaceCallback={handleReplace}
            />
        </div>
    );
});

export default App;
