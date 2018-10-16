import React from 'react';
import DatePicker from 'react-datepicker';
import { observer } from 'mobx-react';
import { compose, withHandlers } from 'recompose';
import moment from 'moment';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/lib/Async';

import { visitStore } from '../../../../store';

import './FormVisit.scss';

const mapActionsToProps  = {
    handleGetSelectedPatients : event => input  => {
        visitStore.onChangePatientOption(input);
    }
};

const patientsOptions = inputValue => {
    visitStore.getSelectedPatients(inputValue);
};

const Form  = ({ handleGetSelectedPatients }) => {
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
                            onInputChange={handleGetSelectedPatients}
                            value={visitStore.patient.label}
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
    handleGetSelectedPatients: PropTypes.func
};

export const FormVisit = compose(
    observer,
    withHandlers(mapActionsToProps))(Form);
