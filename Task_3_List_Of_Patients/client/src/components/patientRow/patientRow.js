import React from 'react';
import PropTypes from 'prop-types';

import { LinkOpenEditModal } from '../linkOpenEditModal';

export const PatientRow = ({
    firstName,
    lastName,
    age,
    id,
    gender,
    phoneNumber,
    emailAdress,
    rowStyle,
    cellStyle,
    linkStyle }) => {
    return (
        <tr className={rowStyle}>
            <td className={cellStyle}>
                <LinkOpenEditModal
                    id={id}
                    linkStyle={linkStyle} />
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
    id: PropTypes.string,
    phoneNumber: PropTypes.string,
    emailAdress: PropTypes.string
};
