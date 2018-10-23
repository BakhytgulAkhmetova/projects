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

const patientOption = { value: 'Id', label: '' };
const doctorOption = { value: 'Id', label: '' };
const descriptionOption = { value: 'Id', label: '' };

const visit = {
    patientId: -1,
    doctorId: -1,
    descriptionId: -1,
    date: new Date()
};

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
    onSelectPatient : ({ changePatient }) =>  (selected) => changePatient(selected),
    // ({ patient, changePatient }) => (selected) => {
    //     // changePatient({ ...patient, value: selected.value, label: selected.label });
    //     // patientOption.value = patient.value;
    //     // patientOption.label = patient.label;
    //     // visit.patientId = patient.value;
    // },
    onSelectDoctor : ({ doctor, changeDoctor }) => (selected) => {
        changeDoctor({ ...doctor, value: selected.value, label: selected.label });
        doctorOption.value = doctor.value;
        doctorOption.label = doctor.label;
        visit.doctorId = doctor.value;
    },
    onSelectDescription : ({ description, changeDescription }) => (selected) => {
        changeDescription({ ...description, value: selected.value, label: selected.label });
        descriptionOption.value = description.value;
        descriptionOption.label = description.label;
        visit.descriptionId = description.value;
    }
};

const getPatientOptions = _.debounce(visitStore.getSelectedPatients, 1000);
const getDoctorOptions = _.debounce(visitStore.getSelectedDoctors, 1000);
const getDescriptionOptions = _.debounce(visitStore.getSelectedDescriptions, 1000);

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
                            onChange={onSelectDoctor}
                            onInputChange={onChangeDoctor}
                            value={doctor}
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
                            loadOptions={(input) => getDescriptionOptions(input)}
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
    withState('patient', 'changePatient', patientOption),
    withState('doctor', 'changeDoctor', doctorOption),
    withState('description', 'changeDescription', descriptionOption),
    withProps(({ patient, doctor, description }) => {
        return { patient, doctor, description };
    }),
    withHandlers(mapActionsToProps))(Form);
