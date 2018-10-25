import React from 'react';
import DatePicker from 'react-datepicker';
import { observer } from 'mobx-react';
import { compose, withHandlers, withState } from 'recompose';
import moment from 'moment';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/lib/Async';
import _ from 'lodash';

import { visitStore } from '../../../../store';

import './FormVisit.scss';

export const visit = visitStore.visit;

const mapActionsToProps  = {
    onChangePatient : ({ changePatient }) => (label) => changePatient({ label }),
    onChangeDoctor : ({ changeDoctor }) => (label) => changeDoctor({ label }),
    onChangeDescription : ({ changeDescription }) => (label) => changeDescription({ label }),
    onSelectPatient : ({ changePatient }) => (selected) => {
        changePatient(selected);
        visit.patient.value = selected.value;
    },
    onSelectDoctor : ({ changeDoctor }) => (selected) => {
        changeDoctor(selected);
        visit.doctor.value = selected.value;
    },
    onSelectDescripion : ({ changeDescription }) => (selected) =>  {
        changeDescription(selected);
        visit.description.value = selected.value;
    },
    onChangeDate: props => date => {
        if (date) {
            visit.date = date._d;
        } else {
            visit.date = date;
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
    onSelectPatient,
    onSelectDoctor,
    onSelectDescripion,
    onChangeDate }) => {
    const visitEdit = visitStore.visit;

    return (
        <form
            key={visitEdit.id}
            className='form'>
            <div className='form__field'>
                <label
                    htmlFor='patient'
                    className='field__label'>
                    Patient
                    <div className='field--visit'>
                        <AsyncSelect
                            cacheOptions
                            defaultValue ={visitEdit.patient}
                            onInputChange={onChangePatient}
                            onChange={onSelectPatient}
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
                            defaultValue ={visitEdit.doctor}
                            onInputChange={onChangeDoctor}
                            onChange={onSelectDoctor}
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
                            value={moment(new Date(), 'DD/MM/YYYY').toString()}
                            onChange={onChangeDate}/>
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
                            defaultValue ={visitEdit.description}
                            onInputChange={onChangeDescription}
                            onChange={onSelectDescripion}
                            loadOptions={(input) => getDescriptionOptions(input)}
                            className='field--visit__select'/>
                    </div>
                </label>
            </div>
        </form>
    );
};

Form.propTypes = {
    visitEdit: PropTypes.object,
    onChangePatient: PropTypes.func,
    onChangeDoctor: PropTypes.func,
    onChangeDescription: PropTypes.func,
    onSelectPatient: PropTypes.func,
    onSelectDoctor: PropTypes.func,
    onSelectDescripion: PropTypes.func,
    onChangeDate: PropTypes.func
};

export const FormVisit = compose(
    withState('patient', 'changePatient'),
    withState('doctor', 'changeDoctor'),
    withState('description', 'changeDescription'),
    withHandlers(mapActionsToProps),
    observer)(Form);
