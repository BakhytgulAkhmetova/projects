import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { observer } from 'mobx-react';
import { withHandlers, compose } from 'recompose';
import moment from 'moment';

import { ErrorMessage } from '../../../../components/ErrorMessage';
import { genders } from '../../../../constants';
import { Validator } from '../../../../utils';
import { configPatient, types } from '../../../../store/data/data';

import './FormPatient.scss';
import 'react-datepicker/dist/react-datepicker.css';

const validator = new Validator({ types, config: configPatient });

const validate = (field, input) => {
    validator.cleanListErrors();

    validator.validate({ [field]: { value: input } });

    return { errors: validator.listErrors[0].msgs, value: input || '' };
};

const genderList = [genders.male, genders.female];

const mapActionsToProps  = {
    onFirstNameChange : ({ changePatient, patient }) => event => {
        const field = 'firstName';
        const firstName = validate(field, event.target.value);

        changePatient({ ...patient, [field]:firstName });
    },
    onLastNameChange : ({ changePatient, patient }) => event => {
        const field = 'lastName';
        const lastName = validate(field, event.target.value);

        changePatient({ ...patient, [field]:lastName });
    },
    onGenderChange : ({ changePatient, patient }) => event => {
        const field = 'gender';
        const gender = validate(field, event.target.value);

        changePatient({ ...patient, [field]:gender });
    },
    onPhoneChange : ({ changePatient, patient }) => event => {
        const field = 'phoneNumber';
        const phone = validate(field, event.target.value);

        changePatient({ ...patient, [field]:phone });
    },
    onEmailChange : ({ changePatient, patient }) => event => {
        const field = 'email';
        const email = validate(field, event.target.value);

        changePatient({ ...patient, [field]:email });
    },
    onSelectDate: ({ changePatient, patient }) => (selected) => {
        const field = 'birthDate';
        const valueSelected = validate(field, selected);

        changePatient({ ...patient, [field]:valueSelected });
    },
    onChangeDateRow:({ changePatient, patient }) => (input) => {
        const field = 'birthDate';

        validator.cleanListErrors();
        const hasErrors = validator.validate({ [field]: { value: input } });

        if (hasErrors) {
            changePatient({ ...patient, [field]:{ value: patient.value, errors: validator.listErrors[0].msgs } });
        } else {
            const valueSelected = { value:  moment(input, 'DD/MM/YYYY') };

            changePatient({ ...patient, [field]:valueSelected });
        }
    }
};

const Form = ({
    patient,
    onChangeDateRow,
    onSelectDate,
    updateIsValidForm,
    onFirstNameChange,
    onLastNameChange,
    onGenderChange,
    onPhoneChange,
    onEmailChange }) => {
    validator.cleanListErrors();
    const isValid = !!validator.validate(patient);

    updateIsValidForm(isValid);

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
                            onChange={onFirstNameChange}
                            id='firstName'
                            placeholder='Enter your first name'
                            className='field__input' />
                    </div>
                </label>
                <ErrorMessage msgs={patient.firstName.errors} />
            </div>
            <div className='form__field'>
                <label
                    htmlFor='lastName'
                    className='field__label'>
                    Last Name
                    <div className='field'>
                        <input
                            value={patient.lastName.value}
                            onChange={onLastNameChange}
                            id='lastName'
                            placeholder='Enter your last name'
                            className='field__input' />
                    </div>
                </label>
                <ErrorMessage msgs={patient.lastName.errors} />
            </div>
            <div className='form__field'>
                <label
                    className='field__label'>
                    Birth Date
                    <div className='field'>
                        <DatePicker
                            id='birthDate'
                            className='date'
                            selected={patient.birthDate.value ? patient.birthDate.value : null}
                            onChangeRaw={onChangeDateRow}
                            isClearable
                            onChange={onSelectDate} />
                    </div>
                </label>
                <ErrorMessage msgs={patient.birthDate.errors} />
            </div>
            <div className='form__field'>
                <label
                    htmlFor='gender'
                    className='field__label'>
                    Gender
                    <div className='field'>
                        <select
                            onChange={onGenderChange}
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
                            onChange={onPhoneChange}
                            id='phoneNumber'
                            placeholder='Enter your phone number'
                            className='field__input' />
                    </div>
                </label>
                <ErrorMessage msgs={patient.phoneNumber.errors} />
            </div>
            <div className='form__field'>
                <label
                    htmlFor='email'
                    className='field__label'>
                    Email
                    <div className='field'>
                        <input
                            value={patient.email.value}
                            onChange={onEmailChange}
                            id='email'
                            placeholder='Enter your email'
                            className='field__input' />
                    </div>
                </label>
                <ErrorMessage msgs={patient.email.errors}/>
            </div>
        </form>
    );
};

export const FormPatient = compose(
    withHandlers(mapActionsToProps),
    observer
)(Form);

Form.propTypes = {
    onChangeDateRow :PropTypes.func,
    onSelectDate: PropTypes.func,
    updateIsValidForm: PropTypes.func,
    onFirstNameChange: PropTypes.func,
    onLastNameChange: PropTypes.func,
    onGenderChange: PropTypes.func,
    onPhoneChange: PropTypes.func,
    onEmailChange: PropTypes.func,
    patient: PropTypes.object
};
