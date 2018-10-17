import React from 'react';
import DatePicker from 'react-datepicker';
import { observer } from 'mobx-react';
import { compose, withHandlers, withState, withProps } from 'recompose';
import moment from 'moment';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/lib/Async';

import { visitStore } from '../../../../store';

import './FormVisit.scss';

const optionInitial = { value: 'Id', label: '' };

const mapActionsToProps  = {
    onChangePatient : ({ patient, changePatient }) => (inputValue) => {
        changePatient({ ...patient, label: inputValue });
    },
    onChangeDoctor : ({ doctor, changeDoctor }) => (inputValue) => {
        changeDoctor({ ...doctor, label: inputValue });
    },
    onChangeDescription : ({ description, changeDescription }) => (inputValue) => {
        changeDescription({ ...description, label: inputValue });
    },
    onSelectPatient : ({ patient, changePatient }) => (selected) => {
        changePatient({ ...patient, value: selected.value, label: selected.label });
        visitStore.visit.patientId = patient.value;
    },
    onSelectDoctor : ({ doctor, changeDoctor }) => (selected) => {
        changeDoctor({ ...doctor, value: selected.value, label: selected.label });
        visitStore.visit.doctorId = doctor.value;
    },
    onSelectDescription : ({ description, changeDescription }) => (selected) => {
        changeDescription({ ...description, value: selected.value, label: selected.label });
        visitStore.visit.descriptionId = description.value;
    }
};

const patientsOptions = inputValue => {
    return visitStore.getSelectedPatients(inputValue);
};
const doctorsOptions = inputValue => {
    return visitStore.getSelectedDoctors(inputValue);
};
const descriptionsOptions = inputValue => {
    return visitStore.getSelectedDescriptions(inputValue);
};

const Form  = ({
    patient,
    doctor,
    description,
    onChangePatient,
    onChangeDoctor,
    onChangeDescription,
    onSelectPatient,
    onSelectDoctor,
    onSelectDescription }) => {
    console.log(patient);
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
                            onChange={onSelectPatient}
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
                            onChange={onSelectDoctor}
                            onInputChange={onChangeDoctor}
                            value={doctor}
                            loadOptions={doctorsOptions}
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
                            onChange={onSelectDescription}
                            onInputChange={onChangeDescription}
                            value={description}
                            loadOptions={descriptionsOptions}
                            className='field--visit__select'/>
                    </div>
                </label>
            </div>
        </form>
    );
};

Form.propTypes = {
    patient: PropTypes.string,
    doctor: PropTypes.string,
    description: PropTypes.string,
    patientsOptions: PropTypes.array,
    doctorsOptions: PropTypes.array,
    descriptionsOptions: PropTypes.array,
    onSelectPatient: PropTypes.func,
    onSelectDoctor: PropTypes.func,
    onSelectDescription: PropTypes.func,
    onChangePatient: PropTypes.func,
    onChangeDoctor: PropTypes.func,
    onChangeDescription: PropTypes.func
};

export const FormVisit = compose(
    observer,
    withState('patient', 'changePatient', optionInitial),
    withState('doctor', 'changeDoctor', optionInitial),
    withState('description', 'changeDescription', optionInitial),
    withProps(({ patient, doctor, description }) => {
        return { patient, doctor, description };
    }),
    withHandlers(mapActionsToProps))(Form);
