import React from 'react';
import { observer } from 'mobx-react';
import { withHandlers, compose } from 'recompose';

import { Button } from '../button';
import { patientStore, modalStore } from '../../store';

const mapActionsToProps = {
    onHandleEditPatient: props => event => {
        event.preventDefault();
        modalStore.close();
        patientStore.editPatient();
        patientStore.getPage();
    }
};

export const ButtonListEditModal = compose(
    withHandlers(mapActionsToProps),
    observer)(({ onHandleEditPatient }) => {
    return (
        [<Button
            key={1}
            title='Edit'
            handleOnClick={onHandleEditPatient}
            className='content__button' />]
    );
});
