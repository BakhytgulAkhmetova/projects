import React from 'react';
// import DatePicker from 'react-datepicker';
import { observer } from 'mobx-react';
import { compose, withHandlers, withState } from 'recompose';
// import moment from 'moment';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/lib/Async';
import _ from 'lodash';

import { visitStore } from '../../../../store';
import { mapCopy } from '../../../../utils';
// import { Validator } from '../../../../utils';
// import { configVisit, types } from '../../../../store/data/data';
// import { ErrorMessage } from '../../../../components/ErrorMessage';

import './FormVisit.scss';

// const validator = new Validator({ types, config: configVisit });

// const validateVisit = ({ changeVisit }) => (visit) => {
//     const visitValidate = visit;

//     validator.validate(visitValidate);
//     const errors = validator.listErrors;

//     for (let i = 0; i < errors.length; i++) {
//         const prop = errors[i].prop;

//         visitValidate[prop] = {
//             ...visit[prop],
//             errors: errors[i].msgs
//         };
//     }
//     changeVisit(visit);
//     validator.cleanListErrors();
// };

const mapActionsToProps  = {
    onSelectPatient : ({ changeVisit, visit }) => (selected) => {
        const selectedModified = { ...selected, errors: [] };

        changeVisit({ ...visit, patient:selectedModified });
    },
    onSelectDoctor : ({ changeVisit, visit }) => (selected) => {
        const selectedModified = { ...selected, errors: [] };

        changeVisit({ ...visit, doctor:selectedModified });
    },
    onSelectDescripion : ({ changeVisit, visit }) => (selected) =>  {
        const selectedModified = { ...selected, errors: [] };

        changeVisit({ ...visit, description:selectedModified });
    },
    onChangeDate: props => date => {
        if (date) {
            visitStore.visit.date = date._d;
        } else {
            visitStore.visit.date = date;
        }
    },
    onChangeDateRow:({ changeVisit }) => (date) => {
        changeVisit({ date });
        // validateVisit();
    }
};

const getPatientOptions = _.debounce(visitStore.getSelectedPatients, 1000);
const getDoctorOptions = _.debounce(visitStore.getSelectedDoctors, 1000);
const getDescriptionOptions = _.debounce(visitStore.getSelectedDescriptions, 1000);

const Form  = ({
    onSelectPatient,
    onSelectDoctor,
    onSelectDescripion,
    onChangeDate,
    onChangeDateRow,
    visit }) => {
    // const dateSelected = moment(visit.date || new Date(), 'DD-MM-YYYY');
    // const isValid = (date) => {
    //     return date <= new Date() && date >= new Date('1870-09-27T16:19:06.879Z');
    // };
    // const dateValidated = visit.date ?
    //     moment(visit.date, 'DD/MM/YYYY') : '';

    return (
        <form
            key={visit.id}
            className='form'>
            <div className='form__field'>
                <label
                    htmlFor='patient'
                    className='field__label'>
                    Patient
                    <div className='field--visit'>
                        <AsyncSelect
                            cacheOptions
                            value ={visit.patient}
                            onChange={onSelectPatient}
                            loadOptions={getPatientOptions}
                            className='field--visit__select'/>
                    </div>
                </label>
                {/* {
                    visit.patient.errors ?
                        <ErrorMessage msgs={visit.patient.errors} /> :
                        null
                } */}
            </div>
            <div className='form__field'>
                <label
                    htmlFor='doctor'
                    className='field__label'>
                    Doctor
                    <div className='field--visit'>
                        <AsyncSelect
                            cacheOptions
                            defaultValue ={visit.doctor}
                            onChange={onSelectDoctor}
                            loadOptions={(input) => getDoctorOptions(input)}
                            className='field--visit__select'/>
                    </div>
                </label>
                {/* {
                    visitE.doctor.errors ?
                        <ErrorMessage msgs={visitE.doctor.errors} /> :
                        null
                } */}
            </div>
            <div className='form__field'>
                <label
                    className='field__label'>
                    Birth Date
                    {/* <div className='field'>
                        <DatePicker
                            id='birthDate'
                            className='date'
                            selected={dateSelected}
                            isClearable
                            onChangeRaw={onChangeDateRow}
                            filterDate={isValid}
                            value={dateValidated}
                            onChange={onChangeDate}/>
                    </div> */}
                </label>
                {/* {
                    visitE.date.errors ?
                        <ErrorMessage msgs={visitE.date.errors} /> :
                        null
                } */}
            </div>
            <div className='form__field'>
                <label
                    htmlFor='description'
                    className='field__label'>
                    Description
                    <div className='field--visit'>
                        <AsyncSelect
                            cacheOptions
                            defaultValue ={visit.description}
                            onChange={onSelectDescripion}
                            loadOptions={(input) => getDescriptionOptions(input)}
                            className='field--visit__select'/>
                    </div>
                </label>
                {/* {
                    visitE.description.errors ?
                        <ErrorMessage msgs={visitE.description.errors} /> :
                        null
                } */}
            </div>
        </form>
    );
};

Form.propTypes = {
    onSelectPatient: PropTypes.func,
    onSelectDoctor: PropTypes.func,
    onSelectDescripion: PropTypes.func,
    onChangeDate: PropTypes.func,
    onChangeDateRow: PropTypes.func,
    visit: PropTypes.object
};

const addProperty = (object, params) => {
    const { key, value } = params;

    return {
        ...object,
        [key]: value
    };
};

export const FormVisit = compose(
    withState('visit', 'changeVisit', ({ visitE }) => {
        const visit = visitE;

        return mapCopy(visit, addProperty, { key:'errors', value: [] });
    }),
    withHandlers(mapActionsToProps),
    observer)(Form);
