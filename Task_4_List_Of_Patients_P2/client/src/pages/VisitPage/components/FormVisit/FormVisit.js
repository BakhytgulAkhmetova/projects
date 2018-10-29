import React from 'react';
import DatePicker from 'react-datepicker';
import { observer } from 'mobx-react';
import { compose, withHandlers, withState } from 'recompose';
import moment from 'moment';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/lib/Async';
import _ from 'lodash';

import { visitStore } from '../../../../store';
import { mapCopy } from '../../../../utils';
// import { Validator } from '../../../../utils';
// import { configVisit, types } from '../../../../store/data/data';
import { ErrorMessage } from '../../../../components/ErrorMessage';

import './FormVisit.scss';

// const validator = new Validator({ types, config: configVisit });

const createValidatedVisit = (visit) => {
    const visitValidated = {
        patient: { value: '' },
        doctor: { value: '' },
        description: { value: '' },
        date: new Date(),
        id: visit.id.value
    };

    for (const prop in visit) {
        if (visit.hasOwnProperty(prop)) {
            if (visit[prop].hasOwnProperty('label')) {
                visitValidated[prop].value = visit[prop].label;
            } else if (prop === 'date') {
                visitValidated.date = new Date(visit[prop].value._i);
            }
        }
    }
    console.log(visitValidated);
    return visitValidated;

    // for (const prop in visitValidated) {
    //     if (visitValidated.hasOwnProperty(prop)) {
    //         if (visitValidated[prop].hasOwnProperty('label')) {
    //             visitValidated[prop].value = visitValidated[prop].label;
    //         } else if (prop === 'date') {
    //             visitValidated[prop].value = new Date(visitValidated[prop].value._i);
    //         }
    //     }
    // }
    // return visitValidated;
};

// const mapAdiingErrorMsg = ({ changeVisit, visit }) => (errs) => {
//     for (let i = 0; i < errs.length; i++) {
//         const prop = errs[i].prop;

//         changeVisit({ ...visit, ...[prop], errors: errs[i] });
//     }
// };

const mapActionsToProps  = {
    onSelectPatient : ({ changeVisit, visit }) => (selected) => {
        let selectedModified;

        if (selected.value) {
            selectedModified = { ...selected, errors: [] };
        } else {
            selectedModified = { ...selected, errors: [],  value: '' };
        }
        changeVisit({ ...visit, patient:selectedModified });

        const visitValidated = createValidatedVisit(visit);

        // validator.validate(visitValidated);
        // const errs = validator.listErrors;

        console.log(visitValidated);

        // mapAdiingErrorMsg(errs);
        console.log(visit);
    },
    onSelectDoctor : ({ changeVisit, visit }) => (selected) => {
        const selectedModified = { ...selected, errors: [] };

        changeVisit({ ...visit, doctor:selectedModified });
    },
    onSelectDescripion : ({ changeVisit, visit }) => (selected) =>  {
        const selectedModified = { ...selected, errors: [] };

        changeVisit({ ...visit, description:selectedModified });
    },
    onSelectDate: ({ changeVisit, visit }) => (selected) => {
        changeVisit({ ...visit, date: { value: selected, errors: [] }  });
    },
    onChangeDateRow:({ changeVisit, visit }) => (date) => {
        changeVisit({ ...visit, date: { value: date, errors: [] }  });
    }
};

const getPatientOptions = _.debounce(visitStore.getSelectedPatients, 1000);
const getDoctorOptions = _.debounce(visitStore.getSelectedDoctors, 1000);
const getDescriptionOptions = _.debounce(visitStore.getSelectedDescriptions, 1000);

const Form  = ({
    onSelectPatient,
    onSelectDoctor,
    onSelectDescripion,
    onSelectDate,
    onChangeDateRow,
    visit }) => {
    const dateSelected = visit.date.value || moment(new Date(), 'DD-MM-YYYY');

    const isValid = (date) => {
        return date <= new Date() && date >= new Date('1870-09-27T16:19:06.879Z');
    };
    // const dateValidated = visit.date.value ?
    //     moment(visit.date.value, 'DD/MM/YYYY') : '';


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
                {
                    visit.patient.errors ?
                        <ErrorMessage msgs={visit.patient.errors} /> :
                        null
                }
            </div>
            <div className='form__field'>
                <label
                    htmlFor='doctor'
                    className='field__label'>
                    Doctor
                    <div className='field--visit'>
                        <AsyncSelect
                            cacheOptions
                            value ={visit.doctor}
                            onChange={onSelectDoctor}
                            loadOptions={(input) => getDoctorOptions(input)}
                            className='field--visit__select'/>
                    </div>
                </label>
                {
                    visit.doctor.errors ?
                        <ErrorMessage msgs={visit.doctor.errors} /> :
                        null
                }
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
                            isClearable
                            onChangeRaw={onChangeDateRow}
                            filterDate={isValid}
                            onChange={onSelectDate}/>
                    </div>
                </label>
                {/* {
                    visit.date.errors ?
                        <ErrorMessage msgs={visit.date.errors} /> :
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
                            value ={visit.description}
                            onChange={onSelectDescripion}
                            loadOptions={(input) => getDescriptionOptions(input)}
                            className='field--visit__select'/>
                    </div>
                </label>
                {
                    visit.description.errors ?
                        <ErrorMessage msgs={visit.description.errors} /> :
                        null
                }
            </div>
        </form>
    );
};

Form.propTypes = {
    onSelectPatient: PropTypes.func,
    onSelectDoctor: PropTypes.func,
    onSelectDescripion: PropTypes.func,
    onSelectDate: PropTypes.func,
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
