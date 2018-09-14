import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PatientRow = ({ rowStyle, cellStyle, linkStyle }) => {
    return (
        <tr className={rowStyle}>
            <td className={cellStyle}>
                <Link
                    className={linkStyle}
                    to='/edit'>Edit
                </Link>
            </td>
            <td className={cellStyle}>ssdsd</td>
            <td className={cellStyle}>ssdsd</td>
            <td className={cellStyle}>ssdsd</td>
            <td className={cellStyle}>ssdsd</td>
            <td className={cellStyle}>ssdsd</td>
            <td className={cellStyle}>ssdsd</td>
        </tr>
    );
};

PatientRow.propTypes = {
    rowStyle: PropTypes.string,
    cellStyle: PropTypes.string,
    linkStyle: PropTypes.string
};
