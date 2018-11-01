import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { observer } from 'mobx-react';
import { withHandlers, compose } from 'recompose';
import moment from 'moment';

import { ErrorMessage } from '../../../../components/ErrorMessage';
import { genders } from '../../../../constants';
// import { patientStore } from '../../../../store';
import { Validator } from '../../../../utils';
import { configVisit, types } from '../../../../store/data/data';

import './FormPatient.scss';
import 'react-datepicker/dist/react-datepicker.css';

const validator = new Validator({ types, config: configVisit });

const validate = (field, input) => {
    validator.cleanListErrors();
    const value = field === 'date' ? selected || '' : selected.label || '';

    validator.validate({ [field]: { value } });

    const valueSelected = field === 'date' ? {
        ...selected, errors: validator.listErrors[0].msgs,
        value: selected || '' } :
        {
            ...selected, errors: validator.listErrors[0].msgs,
            value: selected.value || '',
            label: selected.label || '' };

    return valueSelected;
};

const genderList = [genders.male, genders.female];

const mapActionsToProps  = {
    onFirstNameChange : ({ changePatient, patient }) => (input) => {
        const field = 'firstName';
        const firstName = validate(field, input);

        changePatient({ ...patient, [field]:firstName });
    },
    onSelectDoctor : ({ changeVisit, visit }) => (selected) => {
        const field = 'doctor';
        const valueSelected = validate(field, selected);

        changeVisit({ ...visit, [field]:valueSelected });
    },
    onSelectDescripion : ({ changeVisit, visit }) => (selected) =>  {
        const field = 'description';
        const valueSelected = validate(field, selected);

        changeVisit({ ...visit, [field]:valueSelected });
    },
    onSelectDate: ({ changeVisit, visit }) => (selected) => {
        const field = 'date';
        const valueSelected = validate(field, selected);

        changeVisit({ ...visit, [field]:valueSelected });
    },
    onChangeDateRow:({ changeVisit, visit }) => (input) => {
        const field = 'date';

        validator.cleanListErrors();
        const hasErrors = validator.validate({ [field]: { value: input } });

        if (hasErrors) {
            changeVisit({ ...visit, [field]:{ value: visit.value, errors: validator.listErrors[0].msgs } });
        } else {
            const valueSelected = { value:  moment(input, 'DD/MM/YYYY') };

            changeVisit({ ...visit, [field]:valueSelected });
        }
    },
    onPatientChange: ({ loadOptions, changeOptions }) => () => {
        const field = 'patients';

        changeOptions({ ...loadOptions, [field]: _.debounce(getPatientOptions, loadOptionTimeOut) });
    },
    onDoctorChange: ({ loadOptions, changeOptions }) => () => {
        const field = 'doctors';

        changeOptions({ ...loadOptions, [field]: _.debounce(getDoctorOptions, loadOptionTimeOut) });
    },
    onDescriptionChange: ({ loadOptions, changeOptions }) => () => {
        const field = 'descriptions';

        changeOptions({ ...loadOptions, [field]: _.debounce(getDescriptionOptions, loadOptionTimeOut) });
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
    const dateSelected = moment(patient.birthDate.value || new Date(), 'DD-MM-YYYY');

    // const isValid = (date) => {
    //     return date <= new Date() && date >= new Date('1870-09-27T16:19:06.879Z');
    // };
    // const dateValidated = patient.birthDate.value ?
    //     moment(patient.birthDate.value, 'DD/MM/YYYY') : '';

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
                            selected={dateSelected}
                            onChangeRaw={onChangeDateRow}
                            filterDate={isValid}
                            isClearable
                            value={dateValidated}
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
