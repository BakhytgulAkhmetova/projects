import React from 'react';
import DatePicker from 'react-datepicker';
import { observer } from 'mobx-react';
import { compose, withHandlers, withState } from 'recompose';
// import moment from 'moment';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/lib/Async';
import _ from 'lodash';

import { visitStore } from '../../../../store';
import { Validator } from '../../../../utils';
import { configVisit, types } from '../../../../store/data/data';
import { ErrorMessage } from '../../../../components/ErrorMessage';
// import { regDate } from '../../../../constants';

import './FormVisit.scss';

const validator = new Validator({ types, config: configVisit });

const createValidatedVisit = (visit) => {
    const visitValidated = {
        patient: { value: '' },
        doctor: { value: '' },
        description: { value: '' },
        date: { value: new Date() },
        id: { value: visit.id.value }
    };


    for (const prop in visit) {
        if (visit.hasOwnProperty(prop)) {
            if (visit[prop].hasOwnProperty('label')) {
                visitValidated[prop].value = visit[prop].label;
            } else if (prop === 'date') {
                const date = visit[prop].value;

                visitValidated.date.value = date ? date._d : '';
            }
        }
    }
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

const mapAddingErrorMsg =  (errs, visit) => {
    let visitM = visit;

    for (let i = 0; i < errs.length; i++) {
        const prop = errs[i].prop;

        visitM = { ...visitM, [prop]: {
            errors: errs[i].msgs,
            label: visit[prop].label,
            value: visit[prop].value }  };
    }
    return visitM;
};

const mapActionsToProps  = {
    onSelectPatient : ({ changeVisit, visit }) => (selected) => {
        let selectedModified;

        if (selected.value) {
            selectedModified = { ...selected, errors: [] };
        } else {
            selectedModified = { ...selected, errors: [],  value: '', label: '' };
        }
        changeVisit({ ...visit, patient:selectedModified });
    },
    onSelectDoctor : ({ changeVisit, visit }) => (selected) => {
        let selectedModified;

        if (selected.value) {
            selectedModified = { ...selected, errors: [] };
        } else {
            selectedModified = { ...selected, errors: [],  value: '', label: '' };
        }
        changeVisit({ ...visit, doctor:selectedModified });
    },
    onSelectDescripion : ({ changeVisit, visit }) => (selected) =>  {
        let selectedModified;

        if (selected.value) {
            selectedModified = { ...selected, errors: [] };
        } else {
            selectedModified = { ...selected, errors: [],  value: '', label: '' };
        }

        changeVisit({ ...visit, description:selectedModified });
    },
    onSelectDate: ({ changeVisit, visit }) => (selected) => {
        let selectedModified = selected;

        selectedModified = selected ? selected : '';
        changeVisit({ ...visit, date: { value: selectedModified }  });
    },
    onChangeDateRow:() => (input) => {
        // let date = input;

        // selectedModified = selected ? selected : '';
        // changeVisit({ ...visit, date: { value: selectedModified }  });
        // date = regDate.test(input)? input :
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
    const dateSelected = visit.date.value || '';

    const isValid = (date) => {
        return date <= new Date() && date >= new Date('1870-09-27T16:19:06.879Z');
    };

    validator.cleanListErrors();
    const visitValidated = createValidatedVisit(visit);

    validator.validate(visitValidated);
    const errs = validator.listErrors;
    const v = mapAddingErrorMsg(errs, visit);

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
                            value ={v.patient}
                            onChange={onSelectPatient}
                            loadOptions={getPatientOptions}
                            className='field--visit__select'/>
                    </div>
                </label>
                <ErrorMessage msgs={v.patient.errors} />
            </div>
            <div className='form__field'>
                <label
                    htmlFor='doctor'
                    className='field__label'>
                    Doctor
                    <div className='field--visit'>
                        <AsyncSelect
                            cacheOptions
                            value ={v.doctor}
                            onChange={onSelectDoctor}
                            loadOptions={(input) => getDoctorOptions(input)}
                            className='field--visit__select'/>
                    </div>
                </label>
                <ErrorMessage msgs={v.doctor.errors} />
            </div>
            <div className='form__field'>
                <label
                    className='field__label'>
                    Birth Date
                    <div className='field'>
                        <DatePicker
                            className='date'
                            selected={dateSelected}
                            isClearable
                            value={v.date.value}
                            // onChangeRaw={onChangeDateRow}
                            filterDate={isValid}
                            onChange={onSelectDate}/>
                    </div>
                </label>
                <ErrorMessage msgs={v.date.errors} />
            </div>
            <div className='form__field'>
                <label
                    htmlFor='description'
                    className='field__label'>
                    Description
                    <div className='field--visit'>
                        <AsyncSelect
                            cacheOptions
                            value ={v.description}
                            onChange={onSelectDescripion}
                            loadOptions={(input) => getDescriptionOptions(input)}
                            className='field--visit__select'/>
                    </div>
                </label>
                <ErrorMessage msgs={v.description.errors} />
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

export const FormVisit = compose(
    withState('visit', 'changeVisit', ({ visitE }) => {
        return  visitE;
    }),
    withHandlers(mapActionsToProps),
    observer)(Form);
