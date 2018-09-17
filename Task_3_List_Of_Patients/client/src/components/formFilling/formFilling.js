import React from 'react';
import PropTypes from 'prop-types';

import './formFilling.scss';

export const FormFilling = ({ nameAction }) => {
    return (
        <form className='form'>
            <div className='form__field'>
                <h3 className='form__title'>{nameAction}</h3>
                <span className='close'>&times;</span>
            </div>
            <div className='form__field'>
                <label
                    htmlFor='firstName'
                    className='field__label'>
                    First Name
                </label>
                <input
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
                    id='lastName'
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
                    <option>Male</option>
                    <option>Female</option>
                </select>
            </div>
            <div className='form__field'>
                <label
                    htmlFor='phoneNumber'
                    className='field__label'>
                    Phone
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
                    Email
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

FormFilling.propTypes = {
    nameAction: PropTypes.string
};
