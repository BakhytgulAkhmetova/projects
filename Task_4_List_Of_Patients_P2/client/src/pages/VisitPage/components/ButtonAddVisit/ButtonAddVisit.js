import React from 'react';
import { observer } from 'mobx-react';
import { withHandlers, compose } from 'recompose';

import { Button } from '../../../../components/Button';
import { modalStore, visitStore } from '../../../../store';
import { ContentAddModal } from '../ContentAddModal';
// import { ButtonsModalAdd } from '../ButtonsModalAdd';
// import { FormVisit } from '../FormVisit';

const mapActionsToProps = {
    onHandleOpenModalAdd: props => event => {
        visitStore.cleanVisitFields();
        event.preventDefault();
        modalStore.open({
            title: 'Add visit',
            content: <ContentAddModal visitE={visitStore.visit}/>
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
