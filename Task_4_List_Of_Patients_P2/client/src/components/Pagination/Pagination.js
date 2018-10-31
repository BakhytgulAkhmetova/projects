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
        onChange: PropTypes.func,
        maxVisibleButtons: PropTypes.number,
        totalItemsCount: PropTypes.number,
        pageSize: PropTypes.number,
        id: PropTypes.number
    }

    componentDidMount() {
        this.props.onChange(paginationStore.currentPage);
        const { maxVisibleButtons, totalItemsCount, pageSize, id } = this.props;

        paginationStore.setPageNumber(id);

        paginationStore.setBaseValues(maxVisibleButtons, totalItemsCount, pageSize, id);
    }

    componentDidUpdate() {
        const { maxVisibleButtons, totalItemsCount, pageSize, id } = this.props;

        paginationStore.setBaseValues(maxVisibleButtons, totalItemsCount, pageSize, id);
    }

    handleButtonClick = event => {
        paginationStore.setCurrentPage(+event.target.id);
        this.props.onChange(paginationStore.currentPage);
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
                    onHandleOnClick={this.handleButtonClick}
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
                    onHandleOnClick={this.handleButtonClick}
                    id={currentPage - 1}
                    className={moveButtonsClass}
                    title='«' />
                {buttons}
                <Button
                    onHandleOnClick={this.handleButtonClick}
                    id={currentPage + 1}
                    className={moveButtonsClass}
                    title='»'/>
            </div>
        );
    }
}
