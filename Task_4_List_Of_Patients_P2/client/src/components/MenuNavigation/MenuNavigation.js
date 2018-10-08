import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './MenuNavigation.scss';

export const MenuNavigation = ({ menuItems, menuClassName }) => {
    return (
        <div className={menuClassName}>
            <header className='menu__header' >Menu</header>
            <nav className='menu__nav'>
                {menuItems.map(item => {
                    return (
                        <div
                            className='nav__item'
                            key={item.path}>
                            <Link
                                className='item__link'
                                to={item.path}
                                key={item.path}>
                                {item.name}
                            </Link>
                        </div>
                    );
                })}
            </nav>
        </div>
    );
};

MenuNavigation.propTypes = {
    menuItems: PropTypes.array,
    menuClassName: PropTypes.string
};
