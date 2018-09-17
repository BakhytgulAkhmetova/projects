import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PatientRow = ({
    firstName,
    lastName,
    age,
    gender,
    phoneNumber,
    emailAdress,
    rowStyle,
    cellStyle,
    linkStyle }) => {
    return (
        <tr className={rowStyle}>
            <td className={cellStyle}>
                <Link
                    className={linkStyle}
                    to='/edit'>Edit
                </Link>
            </td>
            <td className={cellStyle}>{firstName}</td>
            <td className={cellStyle}>{lastName}</td>
            <td className={cellStyle}>{gender}</td>
            <td className={cellStyle}>{age}</td>
            <td className={cellStyle}>{phoneNumber}</td>
            <td className={cellStyle}>{emailAdress}</td>
        </tr>
    );
};

PatientRow.propTypes = {
    rowStyle: PropTypes.string,
    cellStyle: PropTypes.string,
    linkStyle: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    gender: PropTypes.string,
    age: PropTypes.number,
    phoneNumber: PropTypes.string,
    emailAdress: PropTypes.string
};
