import React from 'react';
import { observer } from 'mobx-react';
import { withHandlers, compose } from 'recompose';

import { Button } from '../../../../components/Button';
import { ContentAddModal } from '../ContentAddModal';
import { patientStore, modalStore } from '../../../../store';

const mapActionsToProps = {
    onOpenModalAdd: props => event => {
        patientStore.cleanPatientFields();
        modalStore.open({
            title: 'Add patient',
            content: <ContentAddModal
                currentPage={props.currentPage}
                patientModal={patientStore.patient}/>
        });
    }
};

export const ButtonAddPatient = compose(
    withHandlers(mapActionsToProps),
    observer)(({ onOpenModalAdd }) => {
    return (<Button
        onClick={onOpenModalAdd}
        className='btn-add'
        title='Add' />);
});
