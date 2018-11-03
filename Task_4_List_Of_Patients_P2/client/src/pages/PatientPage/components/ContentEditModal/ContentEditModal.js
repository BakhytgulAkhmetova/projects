import React from 'react';
import { observer } from 'mobx-react';
import { withHandlers, compose, withState, lifecycle } from 'recompose';

import { Button } from '../../../../components/Button';
import { FormPatient } from '../../components/FormPatient';
import { patientStore, modalStore, maskStore } from '../../../../store';
import { mapCopy, addProperty } from '../../../../utils';

const mapActionsToProps = {
    editPatient: ({ patient }) => async event => {
        modalStore.close();
        maskStore.open();
        await patientStore.editPatient(patient);
        await patientStore.getPatientsPage(patientStore.currentPage);
        maskStore.close();
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
    editPatient,
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
                onClick={editPatient}
                className='content__button' />
        </div>
    );
});
