import React from 'react';
import { observer } from 'mobx-react';
import { withHandlers, compose } from 'recompose';

import { Button } from '../../../../components/Button';
import { modalStore } from '../../../../store';

const mapActionsToProps = {
    onHandleAddVisit: props => event => {
        event.preventDefault();
        modalStore.close();
    }
};

export const ButtonsModalAdd = compose(
    withHandlers(mapActionsToProps),
    observer)(({ onHandleAddVisit }) => {
    return (
        [<Button
            key={1}
            title='Add'
            onHandleOnClick={onHandleAddVisit}
            className='content__button'/>]
    );
});
