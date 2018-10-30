import React from 'react';
import { observer } from 'mobx-react';
import { withHandlers, compose } from 'recompose';

import { Button } from '../../../../components/Button';
import { FormVisit } from '../../components/FormVisit';
import { patientStore, modalStore } from '../../../../store';

const mapActionsToProps = {
    onHandleAddPatient: props => event => {
        event.preventDefault();
        modalStore.close();
        patientStore.addPatient();
        patientStore.getPatientsPage(props.currentPage);
    }
};

export const ContentAddModal = compose(
    withHandlers(mapActionsToProps),
    observer)(({ onHandleAddPatient, patient }) => {
    return (
        <div>
            <FormVisit patient={patient}/>
            <Button
                onHandleOnClick={onHandleOpenModalAdd}
                className='btn-add'
                title='Add' />


        </div>
    );
});
// <ButtonListAddModal
//     currentPage={props.currentPage}
//     maxViewPatients={4}/>
