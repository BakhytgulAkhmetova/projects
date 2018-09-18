import React from 'react';
import PropTypes from 'prop-types';

import './formPatient.scss';

export const FormPatient = ({ firstName, lastName, birthDate, genderList, phoneNumber, email }) => {
    return (
        <form>
            <div className='form__field'>
                <label
                    htmlFor='firstName'
                    className='field__label'>
                    First Name
                </label>
                <input
                    id='firstName'
                    value={firstName}
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
                    id='lastName'
                    value={lastName}
                    placeholder='Enter your last name'
                    className='field__input' />
            </div>
            <div className='form__field'>
                <label
                    htmlFor='birthDate'
                    className='field__label'>
                    Birth Date
                </label>
                <input
                    id='birthDate'
                    value={birthDate}
                    placeholder='Choose your birth date'
                    className='field__input' />
            </div>
            <div className='form__field'>
                <label
                    htmlFor='gender'
                    className='field__label'>
                    Gender
                </label>
                <select
                    id='gender'
                    className='field__select'>
                    {genderList.map((gender) =>
                        (<option key={gender.id}>
                            {gender.value}
                        </option>))}
                </select>
            </div>
            <div className='form__field'>
                <label
                    htmlFor='phoneNumber'
                    className='field__label'>
                    {phoneNumber}
                </label>
                <input
                    id='phoneNumber'
                    placeholder='Enter your phone number'
                    className='field__input' />
            </div>
            <div className='form__field'>
                <label
                    htmlFor='email'
                    className='field__label'>
                    {email}
                </label>
                <input
                    id='email'
                    placeholder='Enter your email'
                    className='field__input' />
            </div>
            <button className='form__button'>Save</button>
        </form>
    );
};

FormPatient.propTypes = {
    nameAction: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    birthDate: PropTypes.object,
    genderList: PropTypes.array,
    phoneNumber: PropTypes.string,
    email: PropTypes.string
};
