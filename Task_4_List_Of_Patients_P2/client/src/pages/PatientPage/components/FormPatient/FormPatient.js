import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { observer } from 'mobx-react';
import { withHandlers, compose } from 'recompose';
import moment from 'moment';

import { ErrorMessage } from '../../../../components/ErrorMessage';
import { genders } from '../../../../constants';
import { patientStore } from '../../../../store';

import './FormPatient.scss';
import 'react-datepicker/dist/react-datepicker.css';

const genderList = [genders.male, genders.female];

const mapActionsToProps = {
    handleChange: props => event => {
        patientStore.changePatientField(event.target.id, event.target.value);
    },
    handleOnChangeDate: props => date => {
        if (date) {
            patientStore.patient.birthDate.value = date._d;
        } else {
            patientStore.patient.birthDate.value = date;
        }
    }
};

const Form = ({
    patient,
    handleChange,
    handleChangeRaw,
    handleOnChangeDate }) => {
    const dateSelected = moment(patient.birthDate.value || new Date(), 'DD-MM-YYYY');

    const isValid = (date) => {
        return date <= new Date() && date >= new Date('1870-09-27T16:19:06.879Z');
    };
    const dateValidated = patient.birthDate.value ?
        moment(patient.birthDate.value, 'DD/MM/YYYY') : '';

    return (
        <form className='form'>
            <div className='form__field'>
                <label
                    htmlFor='firstName'
                    className='field__label'>
                    First Name
                    <div className='field'>
                        <input
                            value={patient.firstName.value}
                            onChange={handleChange}
                            id='firstName'
                            placeholder='Enter your first name'
                            className='field__input' />
                    </div>
                </label>
                {
                    patient.firstName.errors ?
                        <ErrorMessage msgs={patient.firstName.errors} /> :
                        null
                }
            </div>
            <div className='form__field'>
                <label
                    htmlFor='lastName'
                    className='field__label'>
                    Last Name
                    <div className='field'>
                        <input
                            value={patient.lastName.value}
                            onChange={handleChange}
                            id='lastName'
                            placeholder='Enter your last name'
                            className='field__input' />
                    </div>
                </label>
                {
                    patient.lastName.errors ?
                        <ErrorMessage msgs={patient.lastName.errors} /> :
                        null
                }
            </div>
            <div className='form__field'>
                <label
                    className='field__label'>
                    Birth Date
                    <div className='field__date'>
                        <DatePicker
                            id='birthDate'
                            className='field_date'
                            selected={dateSelected}
                            onChangeRaw={handleChange}
                            filterDate={isValid}
                            isClearable
                            value={dateValidated}
                            onChange={handleOnChangeDate} />
                    </div>
                </label>
                {
                    patient.birthDate.errors ?
                        <ErrorMessage msgs={patient.birthDate.errors} /> :
                        null
                }
            </div>
            <div className='form__field'>
                <label
                    htmlFor='gender'
                    className='field__label'>
                    Gender
                    <div className='field'>
                        <select
                            onChange={handleChange}
                            id='gender'
                            className='field__select'
                            value={patient.gender.value}>
                            {
                                genderList.map(g =>
                                    (<option key={g}>{g}</option>))
                            }
                        </select>
                    </div>
                </label>
            </div>
            <div className='form__field'>
                <label
                    htmlFor='phoneNumber'
                    className='field__label'>
                    Pnone
                    <div className='field'>
                        <input
                            value={patient.phoneNumber.value}
                            onChange={handleChange}
                            id='phoneNumber'
                            placeholder='Enter your phone number'
                            className='field__input' />
                    </div>
                </label>
                {
                    patient.phoneNumber.errors ?
                        <ErrorMessage msgs={patient.phoneNumber.errors} /> :
                        null
                }
            </div>
            <div className='form__field'>
                <label
                    htmlFor='email'
                    className='field__label'>
                    Email
                    <div className='field'>
                        <input
                            value={patient.email.value}
                            onChange={handleChange}
                            id='email'
                            placeholder='Enter your email'
                            className='field__input' />
                    </div>
                </label>
                {
                    patient.email.errors ?
                        <ErrorMessage msgs={patient.email.errors} /> :
                        null
                }
            </div>
        </form>
    );
};

export const FormPatient = compose(
    withHandlers(mapActionsToProps),
    observer
)(Form);

Form.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    birthDate: PropTypes.object,
    genderList: PropTypes.array,
    phoneNumber: PropTypes.string,
    dateSelected: PropTypes.object,
    email: PropTypes.string,
    handleChange: PropTypes.func,
    handleOnChangeDate: PropTypes.func,
    patient: PropTypes.object,
    dateValidated: PropTypes.object,
    handleChangeRaw: PropTypes.func,
    gender: PropTypes.object
};
