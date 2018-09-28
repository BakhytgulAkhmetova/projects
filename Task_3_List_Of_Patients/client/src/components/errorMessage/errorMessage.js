import React from 'react';
import PropTypes from 'prop-types';

import './errorMessage.scss';

export const ErrorMessage = ({ msgs }) => {
    const getErrors = () => {
        const errors = [];

        for (let i = 0; i < msgs.length; i++) {
            errors.push({ key: i, value: msgs[i] });
        }
        return errors;
    };

    return (
        getErrors().map(m =>
            (<span
                key={m.key}
                className='error'>
                {m.value}
            </span>)
        )
    );
};

ErrorMessage.propTypes = {
    msgs: PropTypes.arrayOf(PropTypes.string)
};
