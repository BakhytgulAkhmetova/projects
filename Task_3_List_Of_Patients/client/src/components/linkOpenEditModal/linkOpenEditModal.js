import React from 'react';
import { observer } from 'mobx-react';
import { withHandlers, compose } from 'recompose';
import { Link } from 'react-router-dom';

import { FormPatient } from '../../components/formPatient';
import { ButtonListEditModal } from '../buttonListEditModal';
import { patientStore, modalStore } from '../../store';

const mapActionsToProps = {
    onHandleOpenModalEdit: props => event => {
        event.preventDefault();
        patientStore.get(event.currentTarget.id);
        modalStore.open({
            title: 'Edit patient',
            content: <FormPatient patient={patientStore.patient}/>,
            buttons: <ButtonListEditModal />
        });
    }
};

export const LinkOpenEditModal = compose(
    withHandlers(mapActionsToProps),
    observer)(({ onHandleOpenModalEdit, id, linkStyle }) => {
    return (
        <Link
            onClick={onHandleOpenModalEdit}
            id={id}
            to='/'
            className={linkStyle}>
                Edit
        </Link>
    );
});
