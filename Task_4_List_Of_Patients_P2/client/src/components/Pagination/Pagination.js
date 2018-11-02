import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Button } from '../Button';
import { paginationStore } from '../../store';
import { firstPage } from '../../constants';

import './Pagination.scss';

@observer
export class Pagination extends React.Component {
    static propTypes = {
        onChange: PropTypes.func,
        maxVisibleButtons: PropTypes.number,
        totalItemsCount: PropTypes.number,
        pageSize: PropTypes.number,
        id: PropTypes.number
    }

    componentDidMount() {
        const { maxVisibleButtons, totalItemsCount, pageSize, id, onChange } = this.props;

        paginationStore.setCurrentPage(firstPage);
        paginationStore.setBaseValues(maxVisibleButtons, totalItemsCount, pageSize, id);
        onChange(paginationStore.currentPage);
    }

    componentDidUpdate() {
        const { maxVisibleButtons, totalItemsCount, pageSize, id } = this.props;

        paginationStore.setBaseValues(maxVisibleButtons, totalItemsCount, pageSize, id);
    }

    handleButtonClick = event => {
        const { onChange } = this.props;

        paginationStore.setCurrentPage(+event.target.id);
        onChange(paginationStore.currentPage);
    }

    getButtons = () => {
        const start = paginationStore.firstVisibleButton;
        const end = paginationStore.lastVisibleButton;
        const  currentPage  = paginationStore.currentPage;

        const buttons = [];

        for (let i = start; i <= end; i++) {
            const paginationBtn = classNames({
                'pagination__btn': true,
                'current': i === currentPage
            });

            buttons.push(
                <Button
                    onClick={this.handleButtonClick}
                    id={i}
                    key={i}
                    className={paginationBtn}
                    title={i} />);
        }
        return buttons;
    };

    render() {
        const  currentPage  = paginationStore.currentPage;
        const buttons = this.getButtons();

        const moveButtonsClass = classNames({
            'pagination__btn-move': true,
            'display': buttons.length !== 0
        });

        return (
            <div className='pagination'>
                <Button
                    onClick={this.handleButtonClick}
                    id={currentPage - 1}
                    className={moveButtonsClass}
                    title='«' />
                {buttons}
                <Button
                    onClick={this.handleButtonClick}
                    id={currentPage + 1}
                    className={moveButtonsClass}
                    title='»'/>
            </div>
        );
    }
}
