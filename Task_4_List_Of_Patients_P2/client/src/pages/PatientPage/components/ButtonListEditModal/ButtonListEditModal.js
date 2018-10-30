// import React from 'react';
// import { observer } from 'mobx-react';
// import { withHandlers, compose } from 'recompose';

// import { Button } from '../../../../components/Button';
// import { patientStore, modalStore } from '../../../../store';

// const mapActionsToProps = {
//     onHandleEditPatient: props => event => {
//         event.preventDefault();
//         modalStore.close();
//         patientStore.editPatient();
//         // patientStore.getPatientsPage();
//         patientStore.cleanPatientFields();
//     }
// };

// export const ButtonListEditModal = compose(
//     withHandlers(mapActionsToProps),
//     observer)(({ onHandleEditPatient }) => {
//     return (
//         [<Button
//             key={1}
//             title='Edit'
//             isDisable={patientStore.isInValidPatient}
//             onHandleOnClick={onHandleEditPatient}
//             className='content__button' />]
//     );
// });
