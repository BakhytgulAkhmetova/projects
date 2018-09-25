import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
// import { withHandlers } from 'recompose';


import { FormPatient } from '../../components/formPatient';
import { patientStore } from '../../store';

export const AddModal = observer(({ handleChange, handleOnChangeDate }) => {
    return (<FormPatient patient={patientStore.patient} />);
});

AddModal.propTypes = {
    handleChange: PropTypes.func,
    handleOnChangeDate: PropTypes.func
};
