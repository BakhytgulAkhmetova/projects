import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ title, className, handleOnClick }) => {
    return (
        <button
            onClick={handleOnClick}
            className={className} >
            {title}
        </button>
    );
};

Button.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    handleOnClick: PropTypes.func
};
