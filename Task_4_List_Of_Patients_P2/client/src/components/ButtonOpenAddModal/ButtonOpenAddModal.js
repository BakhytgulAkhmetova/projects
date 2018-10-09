import React from 'react';
import { observer } from 'mobx-react';
import { withHandlers, compose } from 'recompose';

import { Button } from '../Button';
import { FormPatient } from '../../components/FormPatient';
import { ButtonListAddModal } from '../ButtonListAddModal';
import { patientStore, modalStore } from '../../store';

const mapActionsToProps = {
    onHandleOpenModalAdd: props => event => {
        event.preventDefault();
        patientStore.cleanPatientFields();
        modalStore.open({
            title: 'Add patient',
            content: <FormPatient patient={patientStore.patient}/>,
            buttons: <ButtonListAddModal maxViewPatients={4}/>
        });
    }
};

export const ButtonAdd = compose(
    withHandlers(mapActionsToProps),
    observer)(({ onHandleOpenModalAdd }) => {
    return (
        <Button
            onHandleOnClick={onHandleOpenModalAdd}
            className='btn-add'
            title='Add' />
    );
});
