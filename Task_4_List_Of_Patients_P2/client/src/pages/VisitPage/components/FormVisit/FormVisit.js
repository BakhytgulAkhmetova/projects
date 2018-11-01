import React from 'react';
import DatePicker from 'react-datepicker';
import { observer } from 'mobx-react';
import { compose, withHandlers } from 'recompose';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/lib/Async';
import _ from 'lodash';
import moment from 'moment';

import { visitStore } from '../../../../store';
import { ErrorMessage } from '../../../../components/ErrorMessage';
import { loadOptionTimeOut } from '../../../../constants';
import { Validator } from '../../../../utils';
import { configVisit, types } from '../../../../store/data/data';

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

const getPatientOptions = (input, callback) => {
    visitStore.getSelectedPatients(input).then((res) => {
        callback(res);
    });
};
const getDoctorOptions = (input, callback) => {
    visitStore.getSelectedDoctors(input).then((res) => {
        callback(res);
    });
};
const getDescriptionOptions = (input, callback) => {
    visitStore.getSelectedDescriptions(input).then((res) => {
        callback(res);
    });
};

const loadOptionsPatient = _.debounce(getPatientOptions, loadOptionTimeOut);
const loadOptionsDoctor = _.debounce(getDoctorOptions, loadOptionTimeOut);
const loadOptionsDescription = _.debounce(getDescriptionOptions, loadOptionTimeOut);


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
        const hasErrors = validator.validate({ [field]: { value: input } });

        if (hasErrors) {
            changeVisit({ ...visit, [field]:{ value: visit.value, errors: validator.listErrors[0].msgs } });
        } else {
            const valueSelected = { value:  moment(input, 'DD/MM/YYYY') };

            changeVisit({ ...visit, [field]:valueSelected });
        }
    }
};

const Form  = ({
    onSelectPatient,
    onSelectDoctor,
    onSelectDescripion,
    onSelectDate,
    onChangeDateRow,
    updateIsValidForm,
    visit }) => {
    validator.cleanListErrors();
    const isValid = !!validator.validate(visit);

    updateIsValidForm(isValid);
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
                            loadOptions={loadOptionsPatient}
                            defaultOptions
                            className='field--visit__select asd'/>
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
                            loadOptions={loadOptionsDoctor}
                            defaultOptions
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
                            selected={visit.date.value}
                            isClearable
                            onChangeRaw={onChangeDateRow}
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
                            loadOptions={loadOptionsDescription}
                            defaultOptions
                            className='field--visit__select'/>
                    </div>
                </label>
                <ErrorMessage msgs={visit.description.errors} />
            </div>
        </form>
    );
};

Form.propTypes = {
    loadOptions: PropTypes.object,
    onSelectPatient: PropTypes.func,
    onSelectDoctor: PropTypes.func,
    onSelectDescripion: PropTypes.func,
    onSelectDate: PropTypes.func,
    onChangeDateRow: PropTypes.func,
    updateIsValidForm: PropTypes.func,
    visit: PropTypes.object
};

export const FormVisit = compose(
    withHandlers(mapActionsToProps),
    observer)(Form);
