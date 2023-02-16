import './App.scss';
import { observer } from 'mobx-react-lite';
import { PayTable } from './components/pay-table';
import { Hand } from './components/hand';
import { Tools } from './components/tools';
import { UserBar } from './components/user-bar';
import { createDeck, shuffleDeck } from './helpers/deck';
import { checkRankings } from './helpers/rankings';
import { Card } from './types/Shared';
import { multipliers } from './constants/multipliers';
import { gameStore } from './store/game';

const App = observer(() => {
    const changeBetSize = (max: boolean = false) => {
        const { bet } = gameStore.state;

        gameStore.updateState({
            bet: max ? 5 : bet + 1 > 5 ? 1 : bet + 1,
        });
    };

    const makeBet = () => {
        const { balance, bet, log } = gameStore.state;

        gameStore.updateState({
            balance: balance - bet,
            log: [...log, -1],
        });
    };

    const setTableCards = () => {
        let deck = createDeck();

        shuffleDeck(deck);

        const hand = deck.slice(0, 5);
        deck = deck.slice(5, deck.length);

        gameStore.updateState({
            deck,
            hand,
        });
    };

    const holdCard = (card: Card) => {
        const { heldCards } = gameStore.state;

        if (heldCards.some(el => el.id === card.id)) {
            gameStore.updateState({
                heldCards: heldCards.filter(el => el.id !== card.id),
            });
        } else {
            gameStore.updateState({
                heldCards: [...heldCards, card],
            });
        }
    };

    const replaceCards = () => {
        const { heldCards, hand, deck } = gameStore.state;

        const handClone: Card[] = [...hand];
        let deckClone: Card[] = [...deck];

        for (let i = 0; i < handClone.length; i++) {
            if (!heldCards.some(heldCard => heldCard.id === handClone[i].id)) {
                handClone[i] = deckClone[0];

                deckClone = deckClone.slice(1, deck.length);
            }
        }

        gameStore.updateState({
            deck: deckClone,
            hand: handClone,
        });
    };

    const checkIsWin = () => {
        const { hand } = gameStore.state;

        const ranking = checkRankings(hand);

        gameStore.updateState({
            ranking: ranking || null,
        });
    };

    const payTheWin = () => {
        const { balance, ranking, log } = gameStore.state;

        if (!ranking) return;

        const pay = multipliers[ranking.name][gameStore.state.bet - 1];

        gameStore.updateState({
            balance: balance + pay,
            log: [...log, pay],
        });
    };

    const compareCards = (card: Card) => {
        gameStore.updateState({
            comparedCard: card,
        });

        const { hand, comparedCard, balance, log } = gameStore.state;

        const filteredLog = log.filter(num => num > 0);
        const lastPay = filteredLog[filteredLog.length - 1];

        if (comparedCard && comparedCard.weight > hand[0].weight) {
            gameStore.updateState({
                balance: balance + lastPay,
                log: [...log, lastPay],
            });
        } else {
            gameStore.updateState({
                balance: balance - lastPay,
                log: [...log, -lastPay],
            });
        }

        gameStore.updateState({
            gameIsOn: false,
            ranking: null,
        });
    };

    const deal = () => {
        gameStore.reset();
        makeBet();
        setTableCards();
        checkIsWin();

        gameStore.updateState({
            gameIsOn: true,
        });
    };

    const handleMaxBet = () => {
        changeBetSize(true);
        deal();
    };

    const handleReplace = () => {
        replaceCards();
        checkIsWin();
        payTheWin();

        gameStore.updateState({
            gameIsOn: false,
        });
    };

    const handleCardClick = (card: Card) => {
        const { isDoubleMode } = gameStore.state;

        if (isDoubleMode) compareCards(card);
        else holdCard(card);
    };

    const handleDouble = () => {
        gameStore.updateState({
            gameIsOn: true,
            isDoubleMode: true,
            heldCards: [],
        });

        setTableCards();
    };

    return (
        <div className="app">
            <div className="app__inner">
                <PayTable
                    columnClickCallback={bet => {
                        gameStore.updateState({
                            bet,
                        });
                    }}
                />
                {gameStore.state.hand.length ? (
                    <div className="app__hand-wrapper">
                        <Hand cardClickCallback={card => handleCardClick(card)} />
                    </div>
                ) : (
                    <div className="app__hand-placeholder">ВИДЕОПОКЕР</div>
                )}
                <div className="app__user-bar-wrapper">
                    <UserBar />
                </div>
                <Tools
                    raiseBetCallback={() => changeBetSize(false)}
                    maxBetCallback={handleMaxBet}
                    dealCallback={deal}
                    replaceCallback={handleReplace}
                    doubleCallback={handleDouble}
                />
            </div>
        </div>
    );
});

export default App;
