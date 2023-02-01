import { useState } from 'react';

import { PayTable } from './components/pay-table';
import { Tools } from './components/tools';

function App() {
    const [bet, setBet] = useState(1);

    const raiseBet = () => {
        setBet(bet + 1 > 5 ? 1 : bet + 1);
    };

    return (
        <div>
            <PayTable
                bet={bet}
                columnClickCallback={bet => setBet(bet)}
            />
            <br></br>
            <Tools
                bet={bet}
                gameIsOn={false}
                cardsHeld={false}
                won={false}
                raiseBetCallback={raiseBet}
                maxBetCallback={() => setBet(5)}
            />
        </div>
    );
}

export default App;
