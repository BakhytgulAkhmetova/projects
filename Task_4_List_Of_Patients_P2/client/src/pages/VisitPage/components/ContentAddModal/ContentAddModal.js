import React from 'react';
import { observer } from 'mobx-react';
import { withHandlers, compose, withState } from 'recompose';
import moment from 'moment';

import { Button } from '../../../../components/Button';
import { FormVisit } from '../../components/FormVisit';
import { visitStore, modalStore } from '../../../../store';
import { Validator } from '../../../../utils';
import { configVisit, types } from '../../../../store/data/data';
import { mapCopy } from '../../../../utils';

const validator = new Validator({ types, config: configVisit });

const validate = (field, selected) => {
    validator.cleanListErrors();
    const value = field === 'date' ? selected || '' : selected.label || '';

    validator.validate({ [field]: { value } });

    const valueSelected = field === 'date' ? {
        ...selected, errors: validator.listErrors[0].msgs,
        value: selected || '' } :
        {
            ...selected, errors: validator.listErrors[0].msgs,
            value: selected.value || '',
            label: selected.label || '' };

    return valueSelected;
};


const mapActionsToProps  = {
    onHandleAddVisit: props => event => {
        event.preventDefault();
        modalStore.close();
        // visitStore.addVisit(visit);
        visitStore.getVisitPage(props.currentPage);
    },
    onSelectPatient : ({ changeVisit, visit }) => (selected) => {
        const field = 'patient';
        const valueSelected = validate(field, selected);

        changeVisit({ ...visit, [field]:valueSelected });
    },
    onSelectDoctor : ({ changeVisit, visit }) => (selected) => {
        const field = 'doctor';
        const valueSelected = validate(field, selected);

        changeVisit({ ...visit, [field]:valueSelected });
    },
    onSelectDescripion : ({ changeVisit, visit }) => (selected) =>  {
        const field = 'description';
        const valueSelected = validate(field, selected);

        changeVisit({ ...visit, [field]:valueSelected });
    },
    onSelectDate: ({ changeVisit, visit }) => (selected) => {
        const field = 'date';
        const valueSelected = validate(field, selected);

        changeVisit({ ...visit, [field]:valueSelected });
    },
    onChangeDateRow:({ changeVisit, visit }) => (input) => {
        const field = 'date';

        validator.cleanListErrors();
        const hasErrors = validator.validate({ [field]: { value: input } });

        if (hasErrors) {
            changeVisit({ ...visit, [field]:{ value: visit.value, errors: validator.listErrors[0].msgs } });
        } else {
            const valueSelected = { value:  moment(input, 'DD/MM/YYYY') };

            changeVisit({ ...visit, [field]:valueSelected });
        }
    }

};

const addProperty = (object, params) => {
    const { key, value } = params;

    return {
        ...object,
        [key]: value
    };
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
    onSelectPatient,
    onSelectDoctor,
    onSelectDescripion,
    onSelectDate,
    onChangeDateRow,
    isValidForm,
    updateIsValidForm,
    visit }) => {
    validator.cleanListErrors();
    const isValid = !!validator.validate(visit);

    updateIsValidForm(isValid);
    return (
        <div>
            <FormVisit
                onSelectPatient={onSelectPatient}
                onSelectDoctor={onSelectDoctor}
                onSelectDescripion={onSelectDescripion}
                onSelectDate={onSelectDate}
                onChangeDateRow={onChangeDateRow}
                onHandleAddVisit={onHandleAddVisit}
                visit={visit}/>
            <Button
                title='Add'
                isDisable={isValidForm}
                onHandleOnClick={onHandleAddVisit}
                className='content__button'/>
        </div>
    );
});
