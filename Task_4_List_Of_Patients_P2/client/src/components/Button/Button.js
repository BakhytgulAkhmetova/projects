import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ isDisable, title, className, onHandleOnClick, id }) => {
    return (
        <button
            id={id}
            disabled={isDisable}
            onClick={onHandleOnClick}
            className={className} >
            {title}
        </button>
    );
};

Button.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
    onHandleOnClick: PropTypes.func,
    id: PropTypes.number,
    isDisable: PropTypes.bool
};
