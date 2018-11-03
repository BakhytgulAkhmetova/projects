import React from 'react';
import { observer } from 'mobx-react';
import { withHandlers, compose } from 'recompose';

import { Button } from '../../../../components/Button';
import { modalStore, visitStore, maskStore } from '../../../../store';
import { ContentAddModal } from '../ContentAddModal';

const mapActionsToProps = {
    openModalAdd: props => async event => {
        maskStore.open();
        await visitStore.cleanVisitFields();
        maskStore.close();
        modalStore.open({
            title: 'Add visit',
            content: <ContentAddModal
                currentPage={visitStore.currentPage}
                visitModal={visitStore.visit}/>
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
