import React from 'react';
import { observer } from 'mobx-react';

import { Link } from 'react-router-dom';

import './Grid.scss';

export const Grid = observer(({ columns, listItems, handlerOpenModalEdit }) => {
    return (
        <table
            cellSpacing='0'
            className='table-info'>
            <thead>
                <tr className='table-info__row thead'>
                    <td className='table-info__row__cell' />
                    {
                        columns.map((c) => {
                            return (<td
                                key={c.header}
                                className='table-info__row__cell'>
                                {c.header}
                            </td>);
                        })
                    }
                </tr>
            </thead>
            <tbody className='table-info-tbody'>
                {
                    listItems.map((item) => {
                        return (
                            <tr
                                key={item.id}
                                className='table-info__row'>
                                <td className='table-info__row__cell'>
                                    <Link
                                        onClick={handlerOpenModalEdit}
                                        id={item.id}
                                        to='/'
                                        className='table-info__row__cell__link'>
                                        Edit
                                    </Link>
                                </td>
                                {
                                    columns.map((c) => {
                                        return (
                                            <td
                                                key={c.field}
                                                className={'table-info__row__cell'}>
                                                {item[c.field]}
                                            </td>
                                        );
                                    })
                                }
                            </tr>
                        );
                    })
                }
            </tbody>
            <tfoot />
        </table>
    );
});
