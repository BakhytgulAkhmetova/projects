import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import { FormPatient } from '../../components/formPatient';
import { patientStore } from '../../store';

export const AddModal = observer(({ handleChange }) => {
    return (<FormPatient
        patient={patientStore.patient}
        handleOnChange={handleChange} />);
});

AddModal.propTypes = {
    handleChange: PropTypes.func
};
