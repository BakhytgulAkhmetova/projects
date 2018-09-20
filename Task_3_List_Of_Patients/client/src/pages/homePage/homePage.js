import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import { Button } from '../../components/button';
import { ModalView } from '../../components/modalView';
import { AddModal } from '../../components/addModal';
import { EditModal } from '../../components/editModal';
import { Grid } from '../../components/grid';
import { TableMover } from '../../components/tableMover';
import { patientStore, modalStore, buttonStore } from '../../store';

import './homePage.scss';

@observer
export class HomePage extends React.Component {
    static propTypes = {
        patientStore: PropTypes.object
    }

    componentDidMount() {
        patientStore.getAll();
        patientStore.setPatientListView();
        buttonStore.setButtonsViewList(patientStore.patientList.length);
    }

    onHandleOpenModalAdd = (e) => {
        e.preventDefault();
        patientStore.cleanPatientFields();
        modalStore.open({
            title: 'Add patient',
            content: <AddModal
                handleChange={this.onHandleChange}
                handleOnChangeDate={this.onHandleChangeDate} />,
            buttons: [<Button
                key={1}
                title='Add'
                handleOnClick={this.onHandleAddPatient}
                className='content__button' />]
        });
    }

    onHandleOpenModalEdit = (e) => {
        e.preventDefault();
        console.log(e.currentTarget.id);
        patientStore.get(e.currentTarget.id);
        modalStore.open({
            title: 'Edit patient',
            content: <EditModal
                handleChange={this.onHandleChange}
                handleOnChangeDate={this.onHandleChangeDate} />,
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


    onHandleChangeDate(date) {
        patientStore.changePatientField('birthDate', date);
    }

    onHandleAddPatient = (e) => {
        e.preventDefault();
        modalStore.close();
        patientStore.setAge();
        patientStore.addPatient();
        buttonStore.setButtonsViewList(patientStore.patientList.length);

        patientStore.setViewValues(patientStore.currentPage);
        patientStore.setPatientListView();
    }

    onHandleEditPatient = (e) => {
        e.preventDefault();
        modalStore.close();
        patientStore.setAge();
        patientStore.editPatient();
    }

    onHandleOpenPageTable = (e) => {
        e.preventDefault();
        patientStore.setViewValues(e.target.id);
        patientStore.setPatientListView();
    }

    onHandleMoveButtonsBack = (e) => {
        e.preventDefault();
        buttonStore.setMove(e.target.id);
        buttonStore.changeViewButtons();
    }

    onHandleMoveButtonsForward = (e) => {
        e.preventDefault();
        buttonStore.setMove(e.target.id);
        buttonStore.changeViewButtons();
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
                        patientList={patientStore.patientListView}
                        handleOpenEditModal={this.onHandleOpenModalEdit} />
                    <TableMover
                        handleMoveButtonsBack={this.onHandleMoveButtonsBack}
                        handleMoveButtonsForward={this.onHandleMoveButtonsForward}
                        handleOnClick={this.onHandleOpenPageTable} />
                </div>
            </div >
        );
    }
}
