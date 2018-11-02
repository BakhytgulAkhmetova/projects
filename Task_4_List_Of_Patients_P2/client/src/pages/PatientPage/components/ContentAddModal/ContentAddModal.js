import React from 'react';
import { observer } from 'mobx-react';
import { withHandlers, compose, withState } from 'recompose';

import { Button } from '../../../../components/Button';
import { FormPatient } from '../../components/FormPatient';
import { patientStore, modalStore } from '../../../../store';
import { mapCopy, addProperty } from '../../../../utils';

const mapActionsToProps = {
    addPatient:  ({ patient }) => {
        return async () => {
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
    addPatient,
    isValidForm,
    changePatient,
    updateIsValidForm,
    patient }) => {
    return (<div>
        <FormPatient
            changePatient={changePatient}
            updateIsValidForm={updateIsValidForm}
            patient={patient}/>
        <Button
            title='Add'
            isDisable={isValidForm}
            onClick={addPatient}
            className='content__button' />
    </div>);
});
