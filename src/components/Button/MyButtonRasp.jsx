import React from 'react';
import {Counter, Group, TabbarItem} from "@vkontakte/vkui";
import s from './Button.module.scss'

const MyButtonRasp = ({day, index, dayIndex, onClick, month}) => {
    const Month = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    const daysSlice = [
        'Пн',
        'Вт',
        'Ср',
        'Чт',
        'Пт',
        'Сб',
        'Вс'
    ]
    const number = ['13','14','15','16','17','18','19']


    return (
        <TabbarItem
            className={s.item__bar}
            selected={index === dayIndex}
            onClick={onClick}
            text={Month[month.getMonth()]}
        >
            <div className={s.buttonRasp}>
                <span>
                    {
                        number[index]
                    }
                </span>
                <span>
                    {daysSlice[index]}
                </span>
            </div>
        </TabbarItem>

    );
};

export default MyButtonRasp;