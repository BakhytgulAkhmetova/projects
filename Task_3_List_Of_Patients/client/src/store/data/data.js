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

export const data = {
    patientList: [
        {
            firstName: 'Elena',
            lastName: 'Sorokina',
            birthDate: new Date(1996, 3, 12),
            age: 0,
            gender: 'Female',
            phoneNumber: '89991824445',
            email: 'rere@mail.ru',
            id: 1
        },
        {
            firstName: 'Elena',
            lastName: 'Sorokina',
            birthDate: new Date(1934, 3, 12),
            age: 22,
            gender: 'Female',
            phoneNumber: '89991824445',
            email: 'rere@mail.ru',
            id: 2
        },
        {
            firstName: 'Elena',
            lastName: 'Sorokina',
            birthDate: new Date(1967, 3, 12),
            age: 22,
            gender: 'Female',
            phoneNumber: '89991824445',
            email: 'rere@mail.ru',
            id: 3
        },
        {
            firstName: 'Elena',
            lastName: 'Sorokina',
            birthDate: new Date(1934, 3, 12),
            age: 22,
            gender: 'Female',
            phoneNumber: '89991824445',
            email: 'rere@mail.ru',
            id: 4
        }
    ]
};
