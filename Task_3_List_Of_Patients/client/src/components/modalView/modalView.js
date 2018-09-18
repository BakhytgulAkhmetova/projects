import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';

import { FormPatient } from '../formPatient';
import { modalStore } from '../../store';

import './modalView.scss';

@observer
export class ModalView extends React.Component {
    render() {
        const modalDisplay = classNames({
            'modal': true,
            'modal--display': modalStore.isOpen
        });

        return (
            <div className={modalDisplay}>
                <div className='modal__content'>
                    <h3 className='content__title'>{modalStore.title}</h3>
                    <span className='close'>&times;</span>
                    <FormPatient
                        firstName={modalStore.content.firstName}
                        lastName={modalStore.content.lastName}
                        birthDate={modalStore.content.birthDate}
                        genderList={modalStore.content.genderList}
                        phoneNumber={modalStore.content.phoneNumber}
                        email={modalStore.content.emailAdress} />
                </div>
            </div>
        );
    }
}
