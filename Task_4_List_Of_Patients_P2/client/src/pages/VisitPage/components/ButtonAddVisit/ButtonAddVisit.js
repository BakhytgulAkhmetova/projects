import React from 'react';
import { observer } from 'mobx-react';
import { withHandlers, compose } from 'recompose';

import { Button } from '../../../../components/Button';
import { modalStore } from '../../../../store';
import { ButtonsModalAdd } from '../ButtonsModalAdd';
import { FormVisit } from '../FormVisit';

const mapActionsToProps = {
    onHandleOpenModalAdd: props => event => {
        event.preventDefault();
        modalStore.open({
            title: 'Add visit',
            content: <FormVisit/>,
            buttons: <ButtonsModalAdd/>
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
