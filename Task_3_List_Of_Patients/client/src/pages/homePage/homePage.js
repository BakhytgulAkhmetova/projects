import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import { Button } from '../../components/button';
import { ModalView } from '../../components/modalView';
import { Grid } from '../../components/grid';
import { TableMover } from '../../components/tableMover';
import { patientStore, modalStore } from '../../store';

import './homePage.scss';

@observer
export class HomePage extends React.Component {
    static propTypes = {
        patientStore: PropTypes.object
    }

    componentDidMount() {
        patientStore.getAll();
    }

    onHandleOpenModalAdd = (e) => {
        e.preventDefault();
        modalStore.isOpen = true;
    }

    render() {
        return (
            <div>
                <header className='header'>Patients Info</header>
                <div className='content-home-page'>
                    <Button
                        handleOnClick={this.onHandleOpenModalAdd}
                        className='btn-add'
                        title='Add' />
                    <ModalView />
                    <Grid patientList={patientStore.data.patientList} />
                    <TableMover />
                </div>
            </div >
        );
    }
}
