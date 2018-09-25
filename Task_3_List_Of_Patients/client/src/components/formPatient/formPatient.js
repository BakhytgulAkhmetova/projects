import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-date-picker';
import { observer } from 'mobx-react';
import { withHandlers, compose } from 'recompose';

import { genders } from '../../constants';
import { ErrorMessage } from '../errorMessage';
import { patientStore } from '../../store';

import './formPatient.scss';

const genderList = [genders.male, genders.female];

const mapActionsToProps = {
    handleChange: props => event => {
        event.preventDefault();
        patientStore.changePatientField(event.target.id, event.target.value);
    },
    handleOnChangeDate: props => date => {
        patientStore.changePatientField('birthDate', date);
    }
};

const Form = ({
    patient,
    handleChange,
    handleOnChangeDate }) => {
    return (
        <form>
            <div className='form__field'>
                <label
                    htmlFor='firstName'
                    className='field__label'>
                    First Name
                </label>
                <input
                    value={patient.firstName.value}
                    onChange={handleChange}
                    id='firstName'
                    placeholder='Enter your first name'
                    className='field__input' />
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
                </label>
                <input
                    value={patient.lastName.value}
                    onChange={handleChange}
                    id='lastName'
                    placeholder='Enter your last name'
                    className='field__input' />
                {
                    patient.firstName.errors ?
                        <ErrorMessage msgs={patient.lastName.errors} /> :
                        null
                }
            </div>
            <div className='form__field'>
                <span
                    className='field__label'>
                    Birth Date
                </span>
                <div className='field__date'>
                    <DatePicker
                        value={patient.birthDate.value}
                        onChange={handleOnChangeDate.bind(this)} />
                </div>
            </div>
            <div className='form__field'>
                <label
                    htmlFor='gender'
                    className='field__label'>
                    Gender
                </label>
                <select
                    onChange={handleChange}
                    id='gender'
                    className='field__select'
                    value={patient.gender}>
                    {genderList.map(g =>
                        (<option key={g}>{g}</option>))}
                </select>
            </div>
            <div className='form__field'>
                <label
                    htmlFor='phoneNumber'
                    className='field__label'>
                    Pnone
                </label>
                <input
                    value={patient.phoneNumber.value}
                    onChange={handleChange}
                    id='phoneNumber'
                    placeholder='Enter your phone number'
                    className='field__input' />
                {
                    patient.firstName.errors ?
                        <ErrorMessage msgs={patient.phoneNumber.errors} /> :
                        null
                }
            </div>
            <div className='form__field'>
                <label
                    htmlFor='email'
                    className='field__label'>
                    Email
                </label>
                <input
                    value={patient.email.value}
                    onChange={handleChange}
                    id='email'
                    placeholder='Enter your email'
                    className='field__input' />
                {
                    patient.firstName.errors ?
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
    nameAction: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    birthDate: PropTypes.object,
    genderList: PropTypes.array,
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    handleChange: PropTypes.func,
    handleOnChangeDate: PropTypes.func,
    patient: PropTypes.object,
    gender: PropTypes.oneOf([genders.female, genders.male])
};
