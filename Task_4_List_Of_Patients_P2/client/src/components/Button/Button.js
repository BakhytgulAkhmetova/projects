import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ isDisable, title, className, onClick, id }) => {
    return (<button
        id={id}
        disabled={isDisable}
        onClick={onClick}
        className={className} >
        {title}
    </button>);
};

Button.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
    onClick: PropTypes.func,
    id: PropTypes.number,
    isDisable: PropTypes.bool
};
