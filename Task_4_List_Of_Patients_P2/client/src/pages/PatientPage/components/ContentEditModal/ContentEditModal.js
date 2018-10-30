import React from 'react';
import { observer } from 'mobx-react';
import { withHandlers, compose } from 'recompose';

import { Button } from '../../../../components/Button';
import { FormPatient } from '../../components/FormPatient';
// import { ButtonListAddModal } from '../ButtonListAddModal';
import { patientStore, modalStore } from '../../../../store';

const mapActionsToProps = {
    onHandleEditPatient: props => event => {
        event.preventDefault();
        modalStore.close();
        patientStore.editPatient();
        // patientStore.getPatientsPage();
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
                key={1}
                title='Edit'
                isDisable={patientStore.isInValidPatient}
                onHandleOnClick={onHandleEditPatient}
                className='content__button' />


        </div>
    );
});
// <ButtonListAddModal
//     currentPage={props.currentPage}
//     maxViewPatients={4}/>
