import React from 'react';
import { observer } from 'mobx-react';
import { withHandlers, compose } from 'recompose';

import { Button } from '../../../../components/Button';
// import { FormPatient } from '../../components/FormPatient';
// import { ButtonListAddModal } from '../ButtonListAddModal';
import { ContentAddModal } from '../ContentAddModal';
import { patientStore, modalStore } from '../../../../store';

const mapActionsToProps = {
    onHandleOpenModalAdd: props => event => {
        event.preventDefault();
        patientStore.cleanPatientFields();
        modalStore.open({
            title: 'Add patient',
            content: <ContentAddModal patient={patientStore.patient}/>
            // buttons: <ButtonListAddModal
            //     currentPage={props.currentPage}
            //     maxViewPatients={4}/>
        });
    }
};

export const ButtonAddPatient = compose(
    withHandlers(mapActionsToProps),
    observer)(({ onHandleOpenModalAdd }) => {
    return (
        <Button
            onHandleOnClick={onHandleOpenModalAdd}
            className='btn-add'
            title='Add' />
    );
});
