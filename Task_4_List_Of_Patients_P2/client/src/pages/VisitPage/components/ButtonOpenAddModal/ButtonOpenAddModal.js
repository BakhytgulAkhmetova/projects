import React from 'react';
import { observer } from 'mobx-react';
import { withHandlers, compose } from 'recompose';

import { Button } from '../../../../components/Button';
import { patientStore, modalStore } from '../../../../store';

const mapActionsToProps = {
    onHandleOpenModalAdd: props => event => {
        event.preventDefault();
        patientStore.cleanPatientFields();
        modalStore.open({
            title: 'Add visit'
            // content: <FormPatient patient={patientStore.patient}/>,
            // buttons: <ButtonListAddModal maxViewPatients={4}/>
        });
    }
};

export const ButtonAddVisit = compose(
    withHandlers(mapActionsToProps),
    observer)(({ onHandleOpenModalAdd }) => {
    return (
        <Button
            onHandleOnClick={onHandleOpenModalAdd}
            className='btn-add'
            title='Add' />
    );
});
