import React from 'react';
import { observer } from 'mobx-react';
import { withHandlers, compose } from 'recompose';

import { Button } from '../../../../components/Button';
import { FormVisit } from '../FormVisit';
import { visitStore, modalStore } from '../../../../store';

const mapActionsToProps = {
    onHandleEditVisit: props => event => {
        event.preventDefault();
        modalStore.close();
        // visitStore.editVisit(visit);
    }
};

export const ContentEditModal = compose(
    withHandlers(mapActionsToProps),
    observer)(({ onHandleEditVisit }) => {
    return (
        <div>
            <FormVisit visitE={visitStore.visit}/>
            <Button
                key={1}
                title='Edit'
                isDisable={visitStore.isInValidVisit}
                onHandleOnClick={onHandleEditVisit}
                className='content__button' />
        </div>
    );
});
// <ButtonListAddModal
//     currentPage={props.currentPage}
//     maxViewPatients={4}/>
