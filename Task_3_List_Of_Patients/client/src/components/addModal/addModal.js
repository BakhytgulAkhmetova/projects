import React from 'react';
import { observer } from 'mobx-react';

import { FormPatient } from '../../components/formPatient';
import { patientStore } from '../../store';

export const AddModal = observer(() => {
    return (<FormPatient patient={patientStore.patient}/>);
});
