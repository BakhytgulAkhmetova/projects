import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import { FormPatient } from '../../components/formPatient';
import { patientStore } from '../../store';

export const EditModal = observer(({ handleChange, handleOnChangeDate }) => {
    return (<FormPatient patient={patientStore.patient}/>);
});

EditModal.propTypes = {
    handleChange: PropTypes.func,
    handleOnChangeDate: PropTypes.func
};
