import './pay-table.scss';
import { multipliers } from '../constants/multipliers';
import { Rankings, WinRanking } from '../types/Shared';

interface Props {
    bet: number;
    gameIsOn: boolean;
    winRanking: WinRanking | null;
    columnClickCallback: (bet: number) => void;
}

export const PayTable = (props: Props) => {
    const { bet, columnClickCallback } = props;

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
                        Множитель выигрыша (<i>n</i>$)
                    </th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        <td
                            className={`${
                                props.winRanking && props.winRanking.name === row.name
                                    ? 'highlighted'
                                    : ''
                            }`}
                        >
                            {row.title}
                        </td>
                        {row.multipliers.map((cell, cellIndex) => (
                            <td
                                key={`${rowIndex}${cellIndex}`}
                                className={`cell ${bet - 1 === cellIndex ? 'selected' : ''} ${
                                    props.winRanking && props.winRanking.name === row.name
                                        ? 'highlighted'
                                        : ''
                                }`}
                                onClick={() => {
                                    if (!props.gameIsOn) columnClickCallback(cellIndex + 1);
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
};
