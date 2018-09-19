import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import { Button } from '../../components/button';
import { ModalView } from '../../components/modalView';
import { AddModal } from '../../components/addModal';
import { EditModal } from '../../components/editModal';
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
        modalStore.open({
            title: 'Add patient',
            content: <AddModal handleChange={this.onHandleChange} />,
            buttons: [<Button
                key={1}
                title='Add'
                handleOnClick={this.onHandleAddPatient}
                className='content__button' />]
        });
    }

    onHandleOpenModalEdit = (e) => {
        e.preventDefault();
        patientStore.get(e.currentTarget.id);
        modalStore.open({
            title: 'Edit patient',
            content: <EditModal handleChange={this.onHandleChange} />,
            buttons: [<Button
                key={1}
                title='Edit'
                handleOnClick={this.onHandleEditPatient}
                className='content__button' />]
        });
    }

    onHandleChange(e) {
        e.preventDefault();
        patientStore.changePatientField(e.target.id, e.target.value);
        console.log(e.target.id, e.target.value);
    }

    onHandleAddPatient = (e) => {
        e.preventDefault();
        modalStore.close();
        patientStore.addPatient();
    }

    onHandleEditPatient = (e) => {
        e.preventDefault();
        modalStore.close();
        patientStore.editPatient();
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
                    <Grid
                        patientList={patientStore.patientList}
                        handleOpenEditModal={this.onHandleOpenModalEdit} />
                    <TableMover />
                </div>
            </div >
        );
    }
}
