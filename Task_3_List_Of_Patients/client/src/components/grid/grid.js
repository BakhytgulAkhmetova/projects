import React from 'react';

import { PatientRow } from '../patientRow';

import './grid.scss';

export class Grid extends React.Component {
    render() {
        return (
            <table
                cellSpacing='0'
                className='table-info'>
                <thead>
                    <tr className='table-info__row thead'>
                        <td className='table-info__row__cell' />
                        <td className='table-info__row__cell'>First Name</td>
                        <td className='table-info__row__cell'>Last Name</td>
                        <td className='table-info__row__cell'>Gender</td>
                        <td className='table-info__row__cell'>Age</td>
                        <td className='table-info__row__cell'>Phone</td>
                        <td className='table-info__row__cell'>Email</td>
                    </tr>
                </thead>
                <tbody className='table-info-tbody'>
                    <PatientRow
                        rowStyle='table-info__row'
                        cellStyle='table-info__row__cell'
                        linkStyle='table-info__row__cell__link'/>
                    <PatientRow
                        rowStyle='table-info__row'
                        cellStyle='table-info__row__cell'
                        linkStyle='table-info__row__cell__link'/>
                    <PatientRow
                        rowStyle='table-info__row'
                        cellStyle='table-info__row__cell'
                        linkStyle='table-info__row__cell__link'/>
                </tbody>
                <tfoot />
            </table>
        );
    }
}
