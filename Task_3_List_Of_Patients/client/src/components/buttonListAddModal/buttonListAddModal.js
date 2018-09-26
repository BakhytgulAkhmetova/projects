import React from 'react';
import { observer } from 'mobx-react';
import { withHandlers, compose } from 'recompose';

import { Button } from '../button';
import { patientStore, modalStore } from '../../store';

const mapActionsToProps = {
    onHandleAddPatient: props => event => {
        event.preventDefault();
        modalStore.close();
        patientStore.addPatient();
        patientStore.getPage();
    }
};

export const ButtonListAddModal = compose(
    withHandlers(mapActionsToProps),
    observer)(({ onHandleAddPatient }) => {
    return (
        [<Button
            key={1}
            title='Add'
            isDisable = {patientStore.isValidPatient}
            handleOnClick={onHandleAddPatient}
            className='content__button' />]
    );
});
