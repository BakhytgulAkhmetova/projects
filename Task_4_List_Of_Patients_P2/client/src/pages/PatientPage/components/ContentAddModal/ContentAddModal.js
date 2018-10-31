import React from 'react';
import { observer } from 'mobx-react';
import { withHandlers, compose } from 'recompose';

import { Button } from '../../../../components/Button';
import { FormPatient } from '../../components/FormPatient';
import { patientStore, modalStore } from '../../../../store';

const mapActionsToProps = {
    onHandleAddPatient:  props => async event => {
        event.preventDefault();
        modalStore.close();
        await patientStore.addPatient();
        patientStore.getPatientsPage(props.currentPage);
        patientStore.cleanPatientFields();
    }
};

export const ContentAddModal = compose(
    withHandlers(mapActionsToProps),
    observer)(({ onHandleAddPatient, patient }) => {
    return (
        <div>
            <FormPatient patient={patient}/>
            <Button
                title='Add'
                isDisable={patientStore.isInValidPatient}
                onHandleOnClick={onHandleAddPatient}
                className='content__button' />


        </div>
    );
});
// <ButtonListAddModal
//     currentPage={props.currentPage}
//     maxViewPatients={4}/>
