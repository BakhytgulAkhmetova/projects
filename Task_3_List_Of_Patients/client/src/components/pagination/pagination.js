import React from 'react';
import { observer } from 'mobx-react';
import { withHandlers, compose } from 'recompose';

import { Button } from '../button';
import { paginationStore, patientStore } from '../../store';

import './pagination.scss';

const mapActionsToProps = {
    onHandleOpenPageTable: props => event => {
        event.preventDefault();
        paginationStore.current = event.target.id;
        patientStore.getPage();
    },
    onHandleMoveButtonsBack: props => event => {
        event.preventDefault();
        paginationStore.setMove(event.target.id);
        paginationStore.changeViewButtons();
    },

    onHandleMoveButtonsForward: props => event => {
        event.preventDefault();
        paginationStore.setMove(event.target.id);
        paginationStore.changeViewButtons();
    }
};

export const Pagination = compose(withHandlers(mapActionsToProps),
    observer)(({ onHandleOpenPageTable, onHandleMoveButtonsBack, onHandleMoveButtonsForward }) => {
    return (
        <div className='table-mover'>
            <Button
                id={1}
                handleOnClick={onHandleMoveButtonsBack}
                className='table-mover__btn'
                title='«' />
            {
                paginationStore.buttonListView.map(button => {
                    return (
                        <Button
                            handleOnClick={onHandleOpenPageTable}
                            id={button.number}
                            key={button.number}
                            className='table-mover__btn'
                            title={button.number} />
                    );
                })
            }
            <Button
                id={2}
                handleOnClick={onHandleMoveButtonsForward}
                className='table-mover__btn'
                title='»' />
        </div>
    );
});
