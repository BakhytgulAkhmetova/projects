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
        onHandleOpenPageTable: PropTypes.func,
        maxVisibleButtons: PropTypes.number,
        items: PropTypes.number,
        viewitems: PropTypes.number,
        currentPage: PropTypes.number
    }

    componentDidUpdate() {
        const { maxVisibleButtons, items, viewitems } = this.props;

        paginationStore.setBaseValues(maxVisibleButtons, items, viewitems);
    }

    handleDrawButtons = event => {
        event.preventDefault();
        paginationStore.setStartEndbuttons(event.target.id);
    }

    getButtons = () => {
        const start = paginationStore.firstVisibleButton;
        const end = paginationStore.lastVisibleButton;

        const buttons = [];

        for (let i = start; i <= end; i++) {
            const paginationBtn = classNames({
                'pagination__btn': true,
                'current': i === this.props.currentPage
            });

            buttons.push(
                <Button
                    onHandleOnClick={this.props.onHandleOpenPageTable}
                    id={i}
                    key={i}
                    className={paginationBtn}
                    title={i} />);
        }
        return buttons;
    };

    render() {
        const { currentPage } = this.props;
        const buttons = this.getButtons();

        const moveButtonsClass = classNames({
            'pagination__btn-move': true,
            'display': buttons.length !== 0
        });

        return (
            <div className='pagination'>
                <Button
                    onHandleOnClick={this.handleDrawButtons}
                    id={currentPage - 1}
                    className={moveButtonsClass}
                    title='«' />
                {buttons}
                <Button
                    onHandleOnClick={this.handleDrawButtons}
                    id={currentPage + 1}
                    className={moveButtonsClass}
                    title='»'/>
            </div>
        );
    }
}
