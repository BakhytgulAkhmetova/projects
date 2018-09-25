import React from 'react';
import { observer } from 'mobx-react';
import { withHandlers, compose } from 'recompose';

import { Button } from '../button';
import { AddModal } from '../../components/addModal';
import { ButtonListAddModal } from '../buttonListAddModal';
import { patientStore, modalStore } from '../../store';

const mapActionsToProps = {
    onHandleOpenModalAdd: props => event => {
        event.preventDefault();
        patientStore.cleanPatientFields();
        modalStore.open({
            title: 'Add patient',
            content: <AddModal />,
            buttons: <ButtonListAddModal/>
        });
    }
};

export const ButtonAdd = compose(
    withHandlers(mapActionsToProps),
    observer)(({ onHandleOpenModalAdd }) => {
    return (
        <Button
            handleOnClick={onHandleOpenModalAdd}
            className='btn-add'
            title='Add' />
    );
});
