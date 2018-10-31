import React from 'react';
import { observer } from 'mobx-react';
import { withHandlers, compose } from 'recompose';

import { Button } from '../../../../components/Button';
import { FormPatient } from '../../components/FormPatient';
import { patientStore, modalStore } from '../../../../store';

const mapActionsToProps = {
    onHandleEditPatient: props => async event => {
        event.preventDefault();
        modalStore.close();
        await patientStore.editPatient();
        patientStore.getPatientsPage(props.currentPage);
        patientStore.cleanPatientFields();
    }
};

export const ContentEditModal = compose(
    withHandlers(mapActionsToProps),
    observer)(({ onHandleEditPatient, patient }) => {
    return (
        <div>
            <FormPatient patient={patient}/>
            <Button
                title='Edit'
                isDisable={patientStore.isInValidPatient}
                onHandleOnClick={onHandleEditPatient}
                className='content__button' />
        </div>
    );
});
