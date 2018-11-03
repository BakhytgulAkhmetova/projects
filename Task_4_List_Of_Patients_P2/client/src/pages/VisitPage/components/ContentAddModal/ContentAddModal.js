import React from 'react';
import { observer } from 'mobx-react';
import { withHandlers, compose, withState } from 'recompose';

import { Button } from '../../../../components/Button';
import { FormVisit } from '../../components/FormVisit';
import { visitStore, modalStore, maskStore } from '../../../../store';
import { mapCopy, addProperty } from '../../../../utils';

const mapActionsToProps  = {
    addVisit: ({ visit }) =>  {
        return async () => {
            modalStore.close();
            maskStore.open();
            await visitStore.addVisit(visit);
            await visitStore.getVisitPage(visitStore.currentPage);
            maskStore.close();
            visitStore.cleanVisitFields();
        };
    }
};

export const ContentAddModal = compose(
    withState('visit', 'changeVisit', ({ visitModal }) => {
        const visit = visitModal;

        return mapCopy(visit, addProperty, { key:'errors', value: [] });
    }),
    withState('isValidForm', 'updateIsValidForm', false),
    withHandlers(mapActionsToProps),

    observer)(({
    addVisit,
    isValidForm,
    changeVisit,
    updateIsValidForm,
    visit }) => {
    return (
        <div>
            <FormVisit
                changeVisit={changeVisit}
                updateIsValidForm={updateIsValidForm}
                visit={visit}/>
            <Button
                title='Add'
                isDisable={isValidForm}
                onClick={addVisit}
                className='content__button'/>
        </div>
    );
});
