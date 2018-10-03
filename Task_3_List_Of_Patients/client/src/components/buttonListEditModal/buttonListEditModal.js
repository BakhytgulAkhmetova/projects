import React from 'react';
import { observer } from 'mobx-react';
import { withHandlers, compose } from 'recompose';

import { Button } from '../Button';
import { patientStore, modalStore } from '../../store';

const mapActionsToProps = {
    onHandleEditPatient: props => event => {
        event.preventDefault();
        modalStore.close();
        patientStore.editPatient();
        patientStore.getPage();
        patientStore.cleanPatientFields();
    }
};

export const ButtonListEditModal = compose(
    withHandlers(mapActionsToProps),
    observer)(({ onHandleEditPatient }) => {
    return (
        [<Button
            key={1}
            title='Edit'
            isDisable={patientStore.isInValidPatient}
            handleOnClick={onHandleEditPatient}
            className='content__button' />]
    );
});
