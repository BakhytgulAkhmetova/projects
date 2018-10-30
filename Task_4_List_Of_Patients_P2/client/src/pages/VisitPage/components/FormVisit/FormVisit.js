import React from 'react';
import DatePicker from 'react-datepicker';
import { observer } from 'mobx-react';
import { compose, withHandlers, withState } from 'recompose';
import moment from 'moment';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/lib/Async';
import _ from 'lodash';

import { visitStore } from '../../../../store';
import { Validator } from '../../../../utils';
import { configVisit, types } from '../../../../store/data/data';
import { ErrorMessage } from '../../../../components/ErrorMessage';
import { mapCopy } from '../../../../utils';
// import { regDate } from '../../../../constants';

import './FormVisit.scss';

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
        validator.validate({ [field]: { value: input } });
        const valueSelected = { errors: validator.listErrors[0].msgs,
            value: moment(input, ['MM-DD-YYYY', 'DD-MM', 'DD-MM-YYYY']) };

        changeVisit({ ...visit, [field]:valueSelected });
    }

};

const getPatientOptions = _.debounce(visitStore.getSelectedPatients, 300);
const getDoctorOptions = _.debounce(visitStore.getSelectedDoctors, 300);
const getDescriptionOptions = _.debounce(visitStore.getSelectedDescriptions, 300);

const Form  = ({
    onSelectPatient,
    onSelectDoctor,
    onSelectDescripion,
    onSelectDate,
    onChangeDateRow,
    visit }) => {
    return (
        <form
            key={visit.id}
            className='form'>
            <div className='form__field'>
                <label
                    htmlFor='patient'
                    className='field__label'>
                    Patient
                    <div className='field--visit'>
                        <AsyncSelect
                            cacheOptions
                            value ={visit.patient}
                            onChange={onSelectPatient}
                            loadOptions={getPatientOptions}
                            className='field--visit__select'/>
                    </div>
                </label>
                <ErrorMessage msgs={visit.patient.errors} />
            </div>
            <div className='form__field'>
                <label
                    htmlFor='doctor'
                    className='field__label'>
                    Doctor
                    <div className='field--visit'>
                        <AsyncSelect
                            cacheOptions
                            value ={visit.doctor}
                            onChange={onSelectDoctor}
                            loadOptions={(input) => getDoctorOptions(input)}
                            className='field--visit__select'/>
                    </div>
                </label>
                <ErrorMessage msgs={visit.doctor.errors} />
            </div>
            <div className='form__field'>
                <label
                    className='field__label'>
                    Birth Date
                    <div className='field'>
                        <DatePicker
                            className='date'
                            selected={visit.date.value || ''}
                            isClearable
                            value={visit.date.value}
                            // onChangeRaw={onChangeDateRow}
                            onChange={onSelectDate}/>
                    </div>
                </label>
                <ErrorMessage msgs={visit.date.errors} />
            </div>
            <div className='form__field'>
                <label
                    htmlFor='description'
                    className='field__label'>
                    Description
                    <div className='field--visit'>
                        <AsyncSelect
                            cacheOptions
                            value ={visit.description}
                            onChange={onSelectDescripion}
                            loadOptions={(input) => getDescriptionOptions(input)}
                            className='field--visit__select'/>
                    </div>
                </label>
                <ErrorMessage msgs={visit.description.errors} />
            </div>
        </form>
    );
};

Form.propTypes = {
    onSelectPatient: PropTypes.func,
    onSelectDoctor: PropTypes.func,
    onSelectDescripion: PropTypes.func,
    onSelectDate: PropTypes.func,
    onChangeDateRow: PropTypes.func,
    visit: PropTypes.object
};

const addProperty = (object, params) => {
    const { key, value } = params;

    return {
        ...object,
        [key]: value
    };
};

export const FormVisit = compose(
    withState('visit', 'changeVisit', ({ visitE }) => {
        const visit = visitE;

        return mapCopy(visit, addProperty, { key:'errors', value: [] });
    }),
    withHandlers(mapActionsToProps),
    observer)(Form);
