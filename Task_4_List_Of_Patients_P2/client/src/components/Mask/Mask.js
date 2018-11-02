import React from 'react';
import { compose } from 'recompose';
import classNames from 'classnames';
import { observer } from 'mobx-react';

import { maskStore } from '../../store';

import './Mask.scss';

export const Mask = compose(observer)(() => {
    const maskDisplay = classNames({
        'mask': true,
        'mask--display': maskStore.isOpen
    });

    return (<div className={maskDisplay}>
        <div className='loader' />
    </div>);
});
