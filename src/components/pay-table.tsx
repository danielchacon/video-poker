import './pay-table.scss';

interface Props {
    bet: number;
    columnClickCallback: (bet: number) => void;
}

export const PayTable = (props: Props) => {
    const { bet, columnClickCallback } = props;

    const tableData = [
        {
            name: 'royal-flush',
            title: 'Роял Флеш',
            multipliers: [250, 500, 750, 1000, 4000],
        },
        {
            name: 'straight-flush',
            title: 'Стрит Флеш',
            multipliers: [50, 100, 150, 200, 250],
        },
        {
            name: 'four-of-a-kind',
            title: 'Каре',
            multipliers: [25, 50, 75, 100, 125],
        },
        {
            name: 'full-house',
            title: 'Фул Хаус',
            multipliers: [9, 18, 27, 36, 45],
        },
        {
            name: 'flush',
            title: 'Флеш',
            multipliers: [6, 12, 18, 24, 30],
        },
        {
            name: 'Straight',
            title: 'Стрит',
            multipliers: [4, 8, 12, 16, 20],
        },
        {
            name: 'three-of-a-kind',
            title: 'Сет',
            multipliers: [3, 6, 9, 12, 15],
        },
        {
            name: 'two-pairs',
            title: 'Две пары',
            multipliers: [2, 4, 6, 8, 10],
        },
        {
            name: 'jacks-or-better',
            title: 'Вальты и старше',
            multipliers: [1, 2, 3, 4, 5],
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
                                onClick={() => columnClickCallback(cellIndex + 1)}
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
