// import React from 'react';
// import { observer } from 'mobx-react';
// import { withHandlers, compose } from 'recompose';

// import { Button } from '../../../../components/Button';
// import { modalStore, visitStore } from '../../../../store';
// // import { visit } from '../FormVisit';

// const mapActionsToProps = {
//     onHandleAddVisit: props => event => {
//         event.preventDefault();
//         modalStore.close();
//         // visitStore.addVisit(visit);
//         visitStore.getVisitPage(props.currentPage);
//     }
// };

// export const ButtonsModalAdd = compose(
//     withHandlers(mapActionsToProps),
//     observer)(({ onHandleAddVisit }) => {
//     return (
//         [<Button
//             key={1}
//             title='Add'
//             onHandleOnClick={onHandleAddVisit}
//             className='content__button'/>]
//     );
// });
