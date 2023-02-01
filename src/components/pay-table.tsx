import './pay-table.scss';

import { useState } from 'react';

export const PayTable = () => {
    const [selectedColumn, setSelectedColumn] = useState<number>(0);

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

    const handleCellClick = (index: number) => {
        setSelectedColumn(index);
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Комбинация</th>
                    <th colSpan={5}>Множитель выигрыша</th>
                </tr>
            </thead>
            <tbody>
                {tableData.map(row => (
                    <tr>
                        <td>{row.title}</td>
                        {row.multipliers.map((cell, index) => (
                            <td
                                className={`cell ${selectedColumn === index ? 'selected' : ''}`}
                                onClick={() => handleCellClick(index)}
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
