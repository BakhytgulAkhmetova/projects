import React from 'react';
import { observer } from 'mobx-react';
import { withHandlers, compose, withState, lifecycle } from 'recompose';

import { Button } from '../../../../components/Button';
import { FormPatient } from '../../components/FormPatient';
import { patientStore, modalStore } from '../../../../store';
import { mapCopy, addProperty } from '../../../../utils';

const mapActionsToProps = {
    onHandleEditPatient: ({ patient }) => async event => {
        event.preventDefault();
        modalStore.close();
        await patientStore.editPatient(patient);
        patientStore.getPatientsPage(patientStore.currentPage);
        patientStore.cleanPatientFields();
    }
};

export const ContentEditModal = compose(
    withState('patient', 'changePatient', ({ patientModal }) => {
        const patient = patientModal;

        return mapCopy(patient, addProperty, { key:'errors', value: [] });
    }),
    lifecycle({
        componentWillUpdate(nextProps) {
            if (this.props.patient.id.value !== nextProps.patientModal.id.value) {
                const patient = mapCopy(nextProps.patientModal, addProperty, { key:'errors', value: [] });

                this.props.changePatient(patient);
            }
        }
    }),
    withState('isValidForm', 'updateIsValidForm', false),
    withHandlers(mapActionsToProps),
    observer)(({
    isValidForm,
    changePatient,
    updateIsValidForm,
    onHandleEditPatient,
    patient }) => {
    return (
        <div>
            <FormPatient
                changePatient={changePatient}
                updateIsValidForm={updateIsValidForm}
                patient={patient}/>
            <Button
                title='Edit'
                isDisable={isValidForm}
                onHandleOnClick={onHandleEditPatient}
                className='content__button' />
        </div>
    );
});
