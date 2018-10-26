import {
    genders,
    regEmail,
    regPhoneNumber,
    regDate
} from '../../constants';

export const emptyPatient = {
    firstName: {
        value: '',
        errors: []
    },
    id: {
        value: -1,
        errors: []
    },
    age: {
        value: 0,
        errors: []
    },
    lastName: {
        value: '',
        errors: []
    },
    birthDate: {
        value: new Date(),
        errors: []
    },
    gender: {
        value: genders.male,
        errors: []
    },
    phoneNumber: {
        value: '',
        errors: []
    },
    email: {
        value: '',
        errors: []
    }
};

export const emptyVisit = {
    id: { value: -1 },
    patient: { value: '', label: '' },
    doctor: { value: '', label: '' },
    description: { value: '', label: '' },
    date: { value: new Date() }
};

export const menuItems = [
    {
        name: 'Patients',
        path: '/patients'
    },
    {
        name: 'Visits',
        path: '/visits'
    }
];

export const configPatient = {
    firstName: ['isNotEmpty'],
    lastName: ['isNotEmpty'],
    birthDate: ['isNotEmpty', 'isValidDate'],
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
    date: ['isNotEmpty', 'isValidDate'],
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
    isValidDate: {
        validate: value => {
            return (
                regDate.test(value) ||
        (value <= new Date() && value >= new Date('1870-09-27T16:19:06.879Z'))
            );
        },
        instructions: 'Invalid date. Please try again (ex. 13/12/2014)'
    }
};
