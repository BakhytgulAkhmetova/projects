import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';

import { modalStore } from '../../store';

import './modalView.scss';

@observer
export class ModalView extends React.Component {
    handleCloseModal = (e) => {
        e.preventDefault();
        modalStore.close();
    }

    render() {
        const modalDisplay = classNames({
            'modal': true,
            'modal--display': modalStore.isOpen
        });

        return (
            <div className={modalDisplay}>
                <div className='modal__content'>
                    <h3 className='content__title'>{modalStore.title}</h3>
                    <span
                        onClick={this.handleCloseModal}
                        className='content__close'>
                        &times;
                    </span>
                    {modalStore.content}
                    {modalStore.buttons}
                </div>
            </div>
        );
    }
}
