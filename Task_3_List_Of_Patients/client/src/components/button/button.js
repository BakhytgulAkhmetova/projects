import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ title, className }) => {
    return (
        <button
            className={className} >
            {title}
        </button>
    );
};

Button.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string
};
