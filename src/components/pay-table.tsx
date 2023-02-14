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
    const { columnClickCallback } = props;

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
            title: 'Валеты и старше',
            multipliers: multipliers[Rankings.JACKS_OR_BETTER],
        },
    ];

    return (
        <table className="pay-table">
            <tbody>
                {tableData.map((row, rowIndex) => (
                    <>
                        <tr
                            className="pay-table__row pay-table__row--mobile"
                            key={rowIndex}
                        >
                            <td
                                colSpan={5}
                                className={`pay-table__cell pay-table__cell--name ${
                                    ranking &&
                                    ranking.name === row.name &&
                                    'pay-table__cell--highlighted'
                                }`}
                            >
                                {row.title}
                            </td>
                        </tr>
                        <tr
                            className="pay-table__row"
                            key={rowIndex}
                        >
                            <td
                                className={`pay-table__cell pay-table__cell--name pay-table__cell--desktop ${
                                    ranking &&
                                    ranking.name === row.name &&
                                    'pay-table__cell--highlighted'
                                }`}
                            >
                                {row.title}
                            </td>
                            {row.multipliers.map((cell, cellIndex) => (
                                <td
                                    key={`${rowIndex}${cellIndex}`}
                                    className={`pay-table__cell pay-table__cell--pay ${
                                        bet - 1 === cellIndex && 'pay-table__cell--selected'
                                    } ${
                                        ranking &&
                                        ranking.name === row.name &&
                                        'pay-table__cell--highlighted'
                                    }`}
                                    onClick={() => {
                                        if (!gameIsOn) columnClickCallback(cellIndex + 1);
                                    }}
                                >
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    </>
                ))}
            </tbody>
        </table>
    );
});
