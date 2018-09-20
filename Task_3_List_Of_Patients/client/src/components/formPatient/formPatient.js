import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-date-picker';
import { observer } from 'mobx-react';

import { genders } from '../../constants';

import './formPatient.scss';

const genderList = [genders.male, genders.female];

export const FormPatient = observer(({ patient, handleOnChange, handleOnChangeDate }) => {
    return (
        <form>
            <div className='form__field'>
                <label
                    htmlFor='firstName'
                    className='field__label'>
                    First Name
                </label>
                <input
                    value={patient.firstName}
                    onChange={handleOnChange}
                    id='firstName'
                    placeholder='Enter your first name'
                    className='field__input' />
            </div>
            <div className='form__field'>
                <label
                    htmlFor='lastName'
                    className='field__label'>
                    Last Name
                </label>
                <input
                    value={patient.lastName}
                    onChange={handleOnChange}
                    id='lastName'
                    placeholder='Enter your last name'
                    className='field__input' />
            </div>
            <div className='form__field'>
                <span
                    className='field__label'>
                    Birth Date
                </span>
                <div className='field__date'>
                    <DatePicker
                        value={patient.birthDate}
                        onChange={handleOnChangeDate}/>
                </div>
            </div>
            <div className='form__field'>
                <label
                    htmlFor='gender'
                    className='field__label'>
                    Gender
                </label>
                <select
                    onChange={handleOnChange}
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
                    value={patient.phoneNumber}
                    onChange={handleOnChange}
                    id='phoneNumber'
                    placeholder='Enter your phone number'
                    className='field__input' />
            </div>
            <div className='form__field'>
                <label
                    htmlFor='email'
                    className='field__label'>
                    Email
                </label>
                <input
                    value={patient.email}
                    onChange={handleOnChange}
                    id='email'
                    placeholder='Enter your email'
                    className='field__input' />
            </div>
        </form>
    );
});

FormPatient.propTypes = {
    nameAction: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    birthDate: PropTypes.object,
    genderList: PropTypes.array,
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    handleOnChange: PropTypes.func,
    patient: PropTypes.object,
    gender: PropTypes.oneOf([genders.female, genders.male])
};
