import React from 'react';
import { observer } from 'mobx-react';
import { withHandlers, compose, withState } from 'recompose';

import { Button } from '../../../../components/Button';
import { FormVisit } from '../../components/FormVisit';
import { visitStore, modalStore } from '../../../../store';
import { mapCopy, addProperty } from '../../../../utils';

const mapActionsToProps  = {
    onHandleAddVisit: ({ visit }) => event => {
        event.preventDefault();
        modalStore.close();
        visitStore.addVisit(visit);
        //  visitStore.getVisitPage(currentPage);
    }
};

export const ContentAddModal = compose(
    withState('visit', 'changeVisit', ({ visitE }) => {
        const visit = visitE;

        return mapCopy(visit, addProperty, { key:'errors', value: [] });
    }),
    withState('isValidForm', 'updateIsValidForm', false),
    withHandlers(mapActionsToProps),

    observer)(({
    onHandleAddVisit,
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
                onHandleOnClick={onHandleAddVisit}
                className='content__button'/>
        </div>
    );
});
