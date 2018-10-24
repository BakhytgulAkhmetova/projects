import React from 'react';
import DatePicker from 'react-datepicker';
import { observer } from 'mobx-react';
import { compose, withHandlers, withState, withProps } from 'recompose';
import moment from 'moment';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/lib/Async';
import _ from 'lodash';

import { visitStore } from '../../../../store';

import './FormVisit.scss';

const option = { value: 'Id', label: '' };

export const visit = {
    patientId: -1,
    doctorId: -1,
    descriptionId: -1,
    date: new Date()
};

const mapActionsToProps  = {
    onChangePatient : ({ patient, changePatient }) => (inputValue) => {
        changePatient({ inputValue });
        visit.patientId = patient.value;
    },
    onChangeDoctor : ({ doctor, changeDoctor }) => (inputValue) => {
        changeDoctor({ inputValue });
        visit.doctorId = doctor.value;
    },
    onChangeDescription : ({ description, changeDescription }) => (inputValue) =>  {
        changeDescription({ inputValue });
        visit.descriptionId = description.value;
    },
    onChangeDate: props => date => {
        if (date) {
            patientStore.patient.birthDate.value = date._d;
        } else {
            patientStore.patient.birthDate.value = date;
        }
    }
};

const getPatientOptions = _.debounce(visitStore.getSelectedPatients, 1000);
const getDoctorOptions = _.debounce(visitStore.getSelectedDoctors, 1000);
const getDescriptionOptions = _.debounce(visitStore.getSelectedDescriptions, 1000);

const Form  = ({
    onChangePatient,
    onChangeDoctor,
    onChangeDescription, 
    onChangeDate }) => {
    console.log(visit);
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
                            onInputChange={onChangePatient}
                            loadOptions={getPatientOptions}
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
                            onInputChange={onChangeDoctor}
                            loadOptions={(input) => getDoctorOptions(input)}
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
                            onChange={handleOnChangeDate}
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
                            onInputChange={onChangeDescription}
                            loadOptions={(input) => getDescriptionOptions(input)}
                            className='field--visit__select'/>
                    </div>
                </label>
            </div>
        </form>
    );
};

Form.propTypes = {
    onChangePatient: PropTypes.func,
    onChangeDoctor: PropTypes.func,
    onChangeDescription: PropTypes.func,
    onChangeDate: PropTypes.func
};

export const FormVisit = compose(
    observer,
    withProps(),
    withState('patient', 'changePatient', option),
    withState('doctor', 'changeDoctor', option),
    withState('description', 'changeDescription', option),
    withHandlers(mapActionsToProps))(Form);
