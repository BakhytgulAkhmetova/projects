import { genders } from '../../constants';

export const emptyPatient = {
    firstName: '',
    id: -1,
    age: 0,
    lastName: '',
    birthDate: new Date(),
    gender: genders.male,
    phoneNumber: '',
    email: ''
};

export const config = {
    firstName: ['isNotEmpty'],
    lastName: ['isNotEmpty'],
    birthDate: ['isNotEmpty'],
    gender: [],
    phoneNumber: ['isNotEmpty', 'isPhoneNumber'],
    email: ['isNotEmpty', 'isEmail']
};

export const types = {
    isNotEmpty: {
        validate: (value) => {
            return value !== '';
        },
        instructions: 'The value cannot be empty'
    },
    isPhoneNumber: {
        validate: (value) => {
            return !isNaN(value) && /[0-9]{10}/.test(value);
        },
        instructions: 'The value can only be a valid phone number'
    },
    isEmail: {
        validate: (value) => {
            return /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/i.test(value);
        }
    }
};
