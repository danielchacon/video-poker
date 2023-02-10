import './pay-table.scss';
import { observer } from 'mobx-react-lite';
import { multipliers } from '../constants/multipliers';
import { Rankings } from '../types/Shared';
import { gameStore } from '../store/game';

interface Props {
    columnClickCallback: (bet: number) => void;
}

export const PayTable = observer((props: Props) => {
    const { ranking, bet, gameIsOn } = gameStore.state;

    const tableData: { name: Rankings; title: string; multipliers: number[] }[] = [
        {
            name: Rankings.ROYAL_FLUSH,
            title: 'Роял Флеш',
            multipliers: multipliers[Rankings.ROYAL_FLUSH],
        },
        {
            name: Rankings.STRAIGHT_FLUSH,
            title: 'Стрит Флеш',
            multipliers: multipliers[Rankings.STRAIGHT_FLUSH],
        },
        {
            name: Rankings.FOUR_OF_A_KIND,
            title: 'Каре',
            multipliers: multipliers[Rankings.FOUR_OF_A_KIND],
        },
        {
            name: Rankings.FULL_HOUSE,
            title: 'Фул Хаус',
            multipliers: multipliers[Rankings.FULL_HOUSE],
        },
        {
            name: Rankings.FLUSH,
            title: 'Флеш',
            multipliers: multipliers[Rankings.FLUSH],
        },
        {
            name: Rankings.STRAIGHT,
            title: 'Стрит',
            multipliers: multipliers[Rankings.STRAIGHT],
        },
        {
            name: Rankings.THREE_OF_A_KIND,
            title: 'Сет',
            multipliers: multipliers[Rankings.THREE_OF_A_KIND],
        },
        {
            name: Rankings.TWO_PAIRS,
            title: 'Две пары',
            multipliers: multipliers[Rankings.TWO_PAIRS],
        },
        {
            name: Rankings.JACKS_OR_BETTER,
            title: 'Вальты и старше',
            multipliers: multipliers[Rankings.JACKS_OR_BETTER],
        },
    ];

    return (
        <table>
            <thead>
                <tr>
                    <th>Комбинация</th>
                    <th colSpan={5}>
                        Выигрыш ($)
                    </th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        <td
                            className={`${
                                ranking && ranking.name === row.name ? 'highlighted' : ''
                            }`}
                        >
                            {row.title}
                        </td>
                        {row.multipliers.map((cell, cellIndex) => (
                            <td
                                key={`${rowIndex}${cellIndex}`}
                                className={`cell ${bet - 1 === cellIndex ? 'selected' : ''} ${
                                    ranking && ranking.name === row.name ? 'highlighted' : ''
                                }`}
                                onClick={() => {
                                    if (!gameIsOn) props.columnClickCallback(cellIndex + 1);
                                }}
                            >
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
});
