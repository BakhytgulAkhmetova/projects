import React from 'react';
import { observer } from 'mobx-react';
import { withHandlers, compose } from 'recompose';

import { Button } from '../../../../components/Button';
import { modalStore, visitStore } from '../../../../store';
import { ContentAddModal } from '../ContentAddModal';

const mapActionsToProps = {
    openModalAdd: props => event => {
        visitStore.cleanVisitFields();
        modalStore.open({
            title: 'Add visit',
            content: <ContentAddModal visitModal={visitStore.visit}/>
        });
    }
};

export const ButtonAddVisit = compose(
    withHandlers(mapActionsToProps),
    observer)(({ openModalAdd }) => {
    return (
        <Button
            onClick={openModalAdd}
            className='btn-add'
            title='Add' />
    );
});
