import { genders,
    regEmail,
    regPhoneNumber,
    regDate,
    dayLimit,
    dateformat,
    dateStart } from '../../constants';

import moment from 'moment';

export const emptyPatient = {
    firstName: { value: '' },
    id: { value: -1 },
    age: { value: 0 },
    lastName: { value: '' },
    birthDate: { value: moment(new Date()) },
    gender: { value: genders.male },
    phoneNumber: { value: '' },
    email: { value: '' }
};

export const emptyVisit = {
    id: { value: -1 },
    patient: { value: '', label: '' },
    doctor: { value: '', label: '' },
    description: { value: '', label: '' },
    date: { value: moment(new Date())  }
};

export const menuItems = [{
    name: 'Patients',
    path: '/patients' }, {
    name: 'Visits',
    path: '/visits'
}];

export const configPatient = {
    firstName: ['isNotEmpty'],
    lastName: ['isNotEmpty'],
    birthDate: ['isNotEmpty', 'isValidDateFormat', 'isValidDate'],
    gender: [],
    id: [],
    age: [],
    phoneNumber: ['isNotEmpty', 'isPhoneNumber'],
    email: ['isNotEmpty', 'isEmail']
};

export const configVisit = {
    patient: ['isNotEmpty'],
    doctor: ['isNotEmpty'],
    description: ['isNotEmpty'],
    date: ['isNotEmpty', 'isValidDateFormat', 'isValidVisitDate'],
    id: []
};

export const types = {
    isNotEmpty: {
        validate: value => {
            return value !== '' && value !== null && value !== undefined;
        },
        instructions: 'The value cannot be empty'
    },
    isPhoneNumber: {
        validate: value => {
            return value.search(regPhoneNumber) !== -1;
        },
        instructions: 'The value can only be a valid phone number'
    },
    isEmail: {
        validate: value => {
            return regEmail.test(value);
        },
        instructions: 'Invalid Email. Please try again (ex. email2090@mail.ru)'
    },
    isValidDateFormat: {
        validate: value => {
            const date = moment(value).format(dateformat).toString();

            return (regDate.test(date));
        },
        instructions: 'Invalid date format. Please try again (ex. 13/12/2014)'
    },
    isValidDate: {
        validate: value => {
            return ((value <= new Date() && value >= new Date(dateStart)));
        },
        instructions: 'Incorect date. Please try again.'
    },
    isValidVisitDate: {
        validate:  value => {
            return ((value <= new Date((new Date()).getTime() + (dayLimit * 86400000))
            && value >= new Date()));
        },
        instructions: 'Incorect date. Choose date for closer 10 days Please try again.'
    }
};
