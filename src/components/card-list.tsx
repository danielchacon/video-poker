import './card-list.scss';
import { Card } from './card';
import { Card as ICard } from '../types/Shared';

interface Props {
    cardList: ICard[];
}

export const CardList = (props: Props) => {
    return (
        <div className='card-list'>
            {props.cardList.map((el, index) => (
                <Card
                    key={index}
                    card={el}
                />
            ))}
        </div>
    );
};
