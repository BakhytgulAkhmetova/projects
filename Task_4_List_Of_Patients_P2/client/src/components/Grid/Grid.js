import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import './Grid.scss';

export const Grid = ({ columns, listItems, handlerOpenModalEdit, path }) => (
    <table cellSpacing='0' className='table-info'>
        <thead>
            <tr className='table-info__row thead'>
                <td className='table-info__row__cell' />
                {columns.map((c) => {
                    return (<td key={c.header} className='table-info__row__cell'>
                        {c.header}
                    </td>);
                })}
            </tr>
        </thead>
        <tbody className='table-info-tbody'>{listItems.map((item) => {
            return (<tr key={item._id} className='table-info__row'>
                <td className='table-info__row__cell'>
                    <Link
                        onClick={handlerOpenModalEdit}
                        id={item._id} to={`/${path}`}
                        className='table-info__row__cell__link'>
                    Edit
                    </Link>
                </td>
                {columns.map((c) => {
                    return (<td key={c.field} className={'table-info__row__cell'}>
                        {item[c.field]}
                    </td>);
                })}
            </tr>);
        })}
        </tbody>
        <tfoot />
    </table>);

Grid.propTypes = {
    columns: PropTypes.array,
    listItems: PropTypes.array,
    handlerOpenModalEdit: PropTypes.func,
    path: PropTypes.string
};
