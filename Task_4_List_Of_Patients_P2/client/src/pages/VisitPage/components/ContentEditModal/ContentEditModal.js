import React from 'react';
import { observer } from 'mobx-react';
import { withHandlers, compose, withState, lifecycle } from 'recompose';

import { Button } from '../../../../components/Button';
import { FormVisit } from '../FormVisit';
import { modalStore, visitStore } from '../../../../store';
import { mapCopy, addProperty } from '../../../../utils';

const mapActionsToProps  = {
    onHandleEditVisit: ({ visit }) => async event => {
        modalStore.close();
        await visitStore.editVisit(visit);
        visitStore.getVisitPage(visitStore.currentPage);
    }
};

export const ContentEditModal = compose(
    withState('visit', 'changeVisit', ({ visitE }) => {
        const visit = visitE;

        return mapCopy(visit, addProperty, { key:'errors', value: [] });
    }),
    lifecycle({
        componentWillUpdate(nextProps) {
            if (this.props.visit.id.value !== nextProps.visitE.id.value) {
                const visit = mapCopy(nextProps.visitE, addProperty, { key:'errors', value: [] });

                this.props.changeVisit(visit);
            }
        }
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
