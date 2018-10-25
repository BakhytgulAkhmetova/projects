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

import './FormVisit.scss';

const validator = new Validator({ types, config: configVisit });

export const visit = {
    id:  { value: -1, errors: [] },
    patient: { value: '', label: '', errors: [] },
    doctor: { value: '', label: '', errors: [] },
    description: { value: '', label: '', errors: [] },
    date:  { value: new Date(), errors: [] }
};

const getFullVisit = () => {
    visit.patient.label = visitStore.visit.patient.label;
    visit.doctor.label = visitStore.visit.doctor.label;
    visit.description.label = visitStore.visit.description.label;
    visit.patient.value = visitStore.visit.patient.value;
    visit.doctor.value = visitStore.visit.doctor.value;
    visit.description.value = visitStore.visit.description.value;
};

const validateVisit = () => {
    debugger;
    validator.validate(visit);
    const errors = validator.listErrors;

    for (let i = 0; i < errors.length; i++) {
        const prop = errors[i].prop;

        visit[prop] = {
            ...visit[prop],
            errors: errors[i].msgs
        };
    }
    // this.setIsValid();
    validator.cleanListErrors();
};

const mapActionsToProps  = {
    onChangePatient : ({ changePatient }) => (label) => {
        changePatient({ label });
        validateVisit();
    },
    onChangeDoctor : ({ changeDoctor }) => (label) => {
        changeDoctor({ label });
        validateVisit();
    },
    onChangeDescription : ({ changeDescription }) => (label) => {
        changeDescription({ label });
        validateVisit();
    },
    onSelectPatient : ({ changePatient }) => (selected) => {
        changePatient(selected);
        console.log(selected);
        visitStore.visit.patient.value = selected.value;
        validateVisit();
    },
    onSelectDoctor : ({ changeDoctor }) => (selected) => {
        changeDoctor(selected);
        visitStore.visit.doctor.value = selected.value;
        validateVisit();
    },
    onSelectDescripion : ({ changeDescription }) => (selected) =>  {
        changeDescription(selected);
        visitStore.visit.description.value = selected.value;
        validateVisit();
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

    getFullVisit();
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
                {
                    visit.patient.errors ?
                        <ErrorMessage msgs={visit.patient.errors} /> :
                        null
                }
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
                {
                    visit.doctor.errors ?
                        <ErrorMessage msgs={visit.doctor.errors} /> :
                        null
                }
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
                            value={visitEdit.date.toString()}
                            onChange={onChangeDate}/>
                    </div>
                </label>
                {
                    visit.date.errors ?
                        <ErrorMessage msgs={visit.date.errors} /> :
                        null
                }
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
                {
                    visit.description.errors ?
                        <ErrorMessage msgs={visit.description.errors} /> :
                        null
                }
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
