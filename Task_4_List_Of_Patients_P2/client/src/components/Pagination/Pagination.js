import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Button } from '../Button';
import { paginationStore, patientStore } from '../../store';

import './Pagination.scss';

@observer
export class Pagination extends React.Component {
    static propTypes = {
        maxViewBtns: PropTypes.number,
        maxViewPatients: PropTypes.number
    }

    componentDidMount() {
        paginationStore.setBaseValues(this.props.maxViewBtns);
        paginationStore.setMaxCount(this.props.maxViewPatients, patientStore.count);
        paginationStore.setStartButton();
        paginationStore.setEndButton();
    }

    componentWillReceiveProps() {
        paginationStore.setMaxCount(this.props.maxViewPatients, patientStore.count);
        paginationStore.setStartButton();
        paginationStore.setEndButton();
    }

    getButtons = () => {
        const start = paginationStore.start;
        const end = paginationStore.end;

        const buttons = [];

        for (let i = start; i <= end; i++) {
            buttons.push(
                <Button
                    handleOnClick={this.onHandleOpenPageTable}
                    id={i}
                    key={i}
                    className='pagination__btn'
                    title={i} />);
        }
        return buttons;
    };

    onHandleOpenPageTable = event => {
        event.preventDefault();
        paginationStore.setCurrent(event.target.id);
        paginationStore.setStartButton();
        paginationStore.setEndButton();
        patientStore.getPatientsPage();
    }

    onHandleMoveButtonsBack = event => {
        event.preventDefault();
        paginationStore.moveLeft();
        paginationStore.setStartButton();
        paginationStore.setEndButton();
    }

    onHandleMoveButtonsForward = event => {
        event.preventDefault();
        paginationStore.moveRight();
        paginationStore.setStartButton();
        paginationStore.setEndButton();
    }

    render() {
        const buttons = this.getButtons();

        const moveButtonsClass = classNames({
            'pagination__btn-move': true,
            'display': buttons.length !== 0
        });

        return (
            <div className='pagination'>
                <Button
                    handleOnClick={this.onHandleMoveButtonsBack}
                    className={moveButtonsClass}
                    title='«' />

                {buttons}
                <Button
                    handleOnClick={this.onHandleMoveButtonsForward}
                    className={moveButtonsClass}
                    title='»'/>
            </div>
        );
    }
}
