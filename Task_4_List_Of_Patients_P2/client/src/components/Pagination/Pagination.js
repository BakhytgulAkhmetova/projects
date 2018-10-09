import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Button } from '../Button';
import { paginationStore } from '../../store';

import './Pagination.scss';

@observer
export class Pagination extends React.Component {
    static propTypes = {
        onHandleOpenPageTable: PropTypes.func
    }

    handleMoveButtonsBack = event => {
        event.preventDefault();
        paginationStore.moveLeft();
        paginationStore.setStartEndbuttons();
    }

    handleMoveButtonsForward = event => {
        event.preventDefault();
        paginationStore.moveRight();
        paginationStore.setStartEndbuttons();
    }

    getButtons = () => {
        const start = paginationStore.start;
        const end = paginationStore.end;

        const buttons = [];

        for (let i = start; i <= end; i++) {
            buttons.push(
                <Button
                    onHandleOnClick={this.props.onHandleOpenPageTable}
                    id={i}
                    key={i}
                    className='pagination__btn'
                    title={i} />);
        }
        return buttons;
    };

    render() {
        const buttons = this.getButtons();

        const moveButtonsClass = classNames({
            'pagination__btn-move': true,
            'display': buttons.length !== 0
        });

        return (
            <div className='pagination'>
                <Button
                    onHandleOnClick={this.handleMoveButtonsBack}
                    className={moveButtonsClass}
                    title='«' />

                {buttons}
                <Button
                    onHandleOnClick={this.handleMoveButtonsForward}
                    className={moveButtonsClass}
                    title='»'/>
            </div>
        );
    }
}
