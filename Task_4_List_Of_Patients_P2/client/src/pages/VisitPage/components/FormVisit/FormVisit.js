import React from 'react';
import DatePicker from 'react-datepicker';
import { observer } from 'mobx-react';
import { compose } from 'recompose';
import moment from 'moment';
import Select from 'react-select';

import './FormVisit.scss';

const options = ['Mary Jane', 'Spider man', 'Tor'];

const Form  = () => {
    return (
        <form className='form'>
            <div className='form__field'>
                <label
                    htmlFor='patient'
                    className='field__label'>
                    Patient
                    <div className='field--visit'>
                        <Select
                            value={''}
                            className='field--visit__select'
                            onChange={this.handleChange}
                            options={options}/>
                    </div>
                </label>
            </div>
            <div className='form__field'>
                <label
                    htmlFor='doctor'
                    className='field__label'>
                    Doctor
                    <div className='field--visit'>
                        <Select
                            value={''}
                            className='field--visit__select'
                            onChange={this.handleChange}
                            options={options}/>
                    </div>
                </label>
            </div>
            <div className='form__field'>
                <label
                    className='field__label'>
                    Birth Date
                    <div className='field'>
                        <DatePicker
                            id='birthDate'
                            className='date'
                            selected={moment(new Date(), 'DD/MM/YYYY')}
                            isClearable
                            value={moment(new Date(), 'DD/MM/YYYY')}/>
                    </div>
                </label>
            </div>
            <div className='form__field'>
                <label
                    htmlFor='description'
                    className='field__label'>
                    Description
                    <div className='field--visit'>
                        <Select
                            value={''}
                            className='field--visit__select'
                            onChange={this.handleChange}
                            options={options}/>
                    </div>
                </label>
            </div>
        </form>
    );
};

export const FormVisit = compose(observer)(Form);
