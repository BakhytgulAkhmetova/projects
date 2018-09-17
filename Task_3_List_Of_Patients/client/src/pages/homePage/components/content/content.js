import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';

import { Button } from '../../../../components/button';
import { Grid } from '../../../../components/grid';
import { TableMover } from '../../../../components/tableMover';
import { ModalGenerator } from '../../../../components/modalGenerator';

import './content.scss';

@inject('store')
@observer
export class Content extends React.Component {
    static propTypes = {
        store: PropTypes.object
    }

    state = {
        drawModal: false
    };

    onHandleOpenModalAdd = (e) => {
        e.preventDefault();
        this.setState({ drawModal: true });
    }

    render() {
        const { store } = this.props;

        return (
            <div className='content-home-page'>
                <Button
                    handleOnClick={this.onHandleOpenModalAdd}
                    className='btn-add'
                    title='Add' />
                {
                    this.state.drawModal ?
                        (<ModalGenerator />)
                        : null
                }
                <Grid patientList={store.patientList} />
                <TableMover />
            </div>
        );
    }
}
