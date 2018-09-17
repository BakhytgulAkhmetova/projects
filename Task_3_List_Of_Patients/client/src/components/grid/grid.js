import React from 'react';
import PropTypes from 'prop-types';

import { PatientRow } from '../patientRow';

import './grid.scss';

export class Grid extends React.Component {
    static propTypes = {
        patientList: PropTypes.array
    }

    render() {
        const { patientList } = this.props;

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
                    {patientList.map((patient) =>
                        (<PatientRow
                            key={patient.id}
                            firstName={patient.firstName}
                            lastName={patient.lastName}
                            gender={patient.gender}
                            age={patient.age}
                            phoneNumber={patient.phoneNumber}
                            emailAdress={patient.emailAdress}
                            rowStyle='table-info__row'
                            cellStyle='table-info__row__cell'
                            linkStyle='table-info__row__cell__link' />)
                    )}
                </tbody>
                <tfoot />
            </table>
        );
    }
}
