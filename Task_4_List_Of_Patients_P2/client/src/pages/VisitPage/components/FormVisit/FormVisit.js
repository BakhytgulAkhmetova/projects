import React from 'react';
import DatePicker from 'react-datepicker';
import { observer } from 'mobx-react';
import { compose, withHandlers, withState, withProps } from 'recompose';
import moment from 'moment';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/lib/Async';

import { visitStore } from '../../../../store';

import './FormVisit.scss';

const patientInitial = { value: 'patientId', label: '' };

const mapActionsToProps  = {
    onChangePatient : ({ patient, changePatient }) => (inputValue) => {
        changePatient({ ...patient, label: inputValue });
    },
    onChange : ({ patient, changePatient }) => (selected) => {
        changePatient({ ...patient, label: selected.label });
    }
};

const patientsOptions = inputValue => {
    return visitStore.getSelectedPatients(inputValue);
};

const Form  = ({ patient, onChangePatient, onChange, onFocus }) => {
    return (
        <form className='form'>
            <div className='form__field'>
                <label
                    htmlFor='patient'
                    className='field__label'>
                    Patient
                    <div className='field--visit'>
                        <AsyncSelect
                            cacheOptions
                            onChange={onChange}
                            onInputChange={onChangePatient}
                            value={patient}
                            loadOptions={patientsOptions}
                            className='field--visit__select'/>
                    </div>
                </label>
            </div>
            <div className='form__field'>
                <label
                    htmlFor='doctor'
                    className='field__label'>
                    Doctor
                    <div className='field--visit'>
                        <AsyncSelect
                            cacheOptions
                            defaultOptions
                            // loadOptions={promiseOptions}
                            className='field--visit__select'/>
                    </div>
                </label>
            </div>
            <div className='form__field'>
                <label
                    className='field__label'>
                    Birth Date
                    <div className='field'>
                        <DatePicker
                            id='birthDate'
                            className='date'
                            selected={moment(new Date(), 'DD/MM/YYYY')}
                            isClearable
                            value={moment(new Date(), 'DD/MM/YYYY')}/>
                    </div>
                </label>
            </div>
            <div className='form__field'>
                <label
                    htmlFor='description'
                    className='field__label'>
                    Description
                    <div className='field--visit'>
                        <AsyncSelect
                            cacheOptions
                            defaultOptions
                            // loadOptions={promiseOptions}
                            className='field--visit__select'/>
                    </div>
                </label>
            </div>
        </form>
    );
};

Form.propTypes = {
    patient: PropTypes.string,
    patientsOptions: PropTypes.array,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onChangePatient: PropTypes.func
};

export const FormVisit = compose(
    observer,
    withState('patient', 'changePatient', patientInitial),
    withProps(({ patient }) => {
        return { patient };
    }),
    withHandlers(mapActionsToProps))(Form);
