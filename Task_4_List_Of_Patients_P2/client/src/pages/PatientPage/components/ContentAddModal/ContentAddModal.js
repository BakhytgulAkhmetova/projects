import React from 'react';
import { observer } from 'mobx-react';
import { withHandlers, compose, withState } from 'recompose';

import { Button } from '../../../../components/Button';
import { FormPatient } from '../../components/FormPatient';
import { patientStore, modalStore } from '../../../../store';
import { mapCopy, addProperty } from '../../../../utils';

const mapActionsToProps = {
    onHandleAddPatient:  ({ patient }) => {
        return async (event) => {
            event.preventDefault();
            modalStore.close();
            await patientStore.addPatient(patient);
            patientStore.getPatientsPage(patientStore.currentPage);
            patientStore.cleanPatientFields();
        };
    }
};

export const ContentAddModal = compose(
    withState('patient', 'changePatient', ({ patientModal }) => {
        const patient = patientModal;

        return mapCopy(patient, addProperty, { key:'errors', value: [] });
    }),
    withState('isValidForm', 'updateIsValidForm', false),
    withHandlers(mapActionsToProps),
    observer)(({
    onHandleAddPatient,
    isValidForm,
    changePatient,
    updateIsValidForm,
    patient }) => {
    return (
        <div>
            <FormPatient
                changePatient={changePatient}
                updateIsValidForm={updateIsValidForm}
                patient={patient}/>
            <Button
                title='Add'
                isDisable={isValidForm}
                onHandleOnClick={onHandleAddPatient}
                className='content__button' />
        </div>
    );
});
