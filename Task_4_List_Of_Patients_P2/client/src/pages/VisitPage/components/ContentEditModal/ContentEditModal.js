import React from 'react';
import { observer } from 'mobx-react';
import { withHandlers, compose, withState } from 'recompose';

import { Button } from '../../../../components/Button';
import { FormVisit } from '../FormVisit';
import { modalStore, visitStore } from '../../../../store';
import { mapCopy, addProperty } from '../../../../utils';

const mapActionsToProps  = {
    onHandleEditVisit: ({ visit }) => event => {
        event.preventDefault();
        modalStore.close();
        visitStore.editVisit(visit);
    }
};

export const ContentEditModal = compose(
    withState('visit', 'changeVisit', ({ visitE }) => {
        const visit = visitE;

        return mapCopy(visit, addProperty, { key:'errors', value: [] });
    }),
    withState('isValidForm', 'updateIsValidForm', false),
    withHandlers(mapActionsToProps),
    observer)(({
    onHandleEditVisit,
    changeVisit,
    isValidForm,
    updateIsValidForm,
    visit }) => {
    return (
        <div>
            <FormVisit
                changeVisit={changeVisit}
                updateIsValidForm={updateIsValidForm}
                visit={visit}/>
            <Button
                title='Edit'
                isDisable={isValidForm}
                onHandleOnClick={onHandleEditVisit}
                className='content__button' />
        </div>
    );
});
// <ButtonListAddModal
//     currentPage={props.currentPage}
//     maxViewPatients={4}/>
