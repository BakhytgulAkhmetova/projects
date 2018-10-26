import React from 'react';
import { observer } from 'mobx-react';
import { withHandlers, compose } from 'recompose';

import { Button } from '../../../../components/Button';
import { modalStore } from '../../../../store';
// import { visit } from '../FormVisit';

const mapActionsToProps = {
    onHandleEditVisit: props => event => {
        event.preventDefault();
        modalStore.close();
        // visitStore.editVisit(visit);
    }
};

export const ButtonsModalEdit = compose(
    withHandlers(mapActionsToProps),
    observer)(({ onHandleEditVisit }) => {
    return (
        [<Button
            key={1}
            title='Edit'
            // isDisable={patientStore.isInValidPatient}
            onHandleOnClick={onHandleEditVisit}
            className='content__button' />]
    );
});
