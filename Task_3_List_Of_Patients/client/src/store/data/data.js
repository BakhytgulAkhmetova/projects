import { genders, regEmail, regPhoneNumber, regBirthDay } from '../../constants';

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

export const config = {
    firstName: ['isNotEmpty'],
    lastName: ['isNotEmpty'],
    birthDate: ['isNotEmpty', 'isValidDate'],
    gender: [],
    id: [],
    age:[],
    phoneNumber: ['isNotEmpty', 'isPhoneNumber'],
    email: ['isNotEmpty', 'isEmail']
};

export const types = {
    isNotEmpty: {
        validate: (value) => {
            return value !== '' && value !== null;
        },
        instructions: 'The value cannot be empty'
    },
    isPhoneNumber: {
        validate: (value) => {
            return value.search(regPhoneNumber) !== -1;
        },
        instructions: 'The value can only be a valid phone number'
    },
    isEmail: {
        validate: (value) => {
            return regEmail.test(value);
        },
        instructions: 'Invalid Email. Please try again (ex. email2090@mail.ru)'
    },
    isValidDate: {
        validate: (value) => {
            return regBirthDay.test(value) || (value <= new Date() && value >= new Date('1870-09-27T16:19:06.879Z'));
        },
        instructions: 'Invalid date. Please try again (ex. 13/12/2014)'
    }
};
