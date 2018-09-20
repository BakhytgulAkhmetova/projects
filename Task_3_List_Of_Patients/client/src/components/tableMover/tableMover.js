import React from 'react';
import { observer } from 'mobx-react';

import { Button } from '../button';
import { buttonStore } from '../../store';

import './tableMover.scss';

export const TableMover = observer(({ handleOnClick, handleMoveButtonsBack, handleMoveButtonsForward }) => {
    return (
        <div className='table-mover'>
            <Button
                id={1}
                handleOnClick={handleMoveButtonsBack}
                className='table-mover__btn'
                title='«' />
            {
                buttonStore.buttonListView.map(button => {
                    return (
                        <Button
                            handleOnClick={handleOnClick}
                            id={button.number}
                            key={button.number}
                            className='table-mover__btn'
                            title={button.number} />
                    );
                })
            }
            <Button
                id={2}
                handleOnClick={handleMoveButtonsForward}
                className='table-mover__btn'
                title='»' />
        </div>
    );
});
