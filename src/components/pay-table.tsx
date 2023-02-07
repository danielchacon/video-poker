import './pay-table.scss';
import { multipliers } from '../constants/multipliers';
import { Rankings } from '../types/Shared';

interface Props {
    bet: number;
    gameIsOn: boolean;
    columnClickCallback: (bet: number) => void;
}

export const PayTable = (props: Props) => {
    const { bet, columnClickCallback } = props;

    const tableData = [
        {
            title: 'Роял Флеш',
            multipliers: multipliers[Rankings.ROYAL_FLUSH],
        },
        {
            title: 'Стрит Флеш',
            multipliers: multipliers[Rankings.STRAIGHT_FLUSH],
        },
        {
            title: 'Каре',
            multipliers: multipliers[Rankings.FOUR_OF_A_KIND],
        },
        {
            title: 'Фул Хаус',
            multipliers: multipliers[Rankings.FULL_HOUSE],
        },
        {
            title: 'Флеш',
            multipliers: multipliers[Rankings.FLUSH],
        },
        {
            title: 'Стрит',
            multipliers: multipliers[Rankings.STRAIGHT],
        },
        {
            title: 'Сет',
            multipliers: multipliers[Rankings.THREE_OF_A_KIND],
        },
        {
            title: 'Две пары',
            multipliers: multipliers[Rankings.TWO_PAIRS],
        },
        {
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
                        Множитель выигрыша (1$ x <i>n</i>)
                    </th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        <td>{row.title}</td>
                        {row.multipliers.map((cell, cellIndex) => (
                            <td
                                key={`${rowIndex}${cellIndex}`}
                                className={`cell ${bet - 1 === cellIndex ? 'selected' : ''}`}
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
