import React from 'react';
import { observer } from 'mobx-react';

import { ButtonAddPatient } from './components/ButtonOpenAddModal';
import { Grid } from '../../components/Grid';
import { Pagination } from '../../components/Pagination';
import { patientStore, modalStore } from '../../store';
import { MenuNavigation } from '../../components/MenuNavigation';
import { menuItems } from '../../store/data/data';
import { maxVisibleButtons, viewitems } from '../../constants';

import { FormPatient } from './components/FormPatient';
import { ButtonListEditModal } from './components/ButtonListEditModal';

import './PatientPage.scss';

const columns = [
    {
        header: 'First Name',
        field: 'firstName'
    },
    {
        header: 'Last Name',
        field: 'lastName'
    },
    {
        header: 'Gender',
        field: 'gender'
    },
    {
        header: 'Age',
        field: 'age'
    },
    {
        header: 'Phone',
        field: 'phoneNumber'
    },
    {
        header: 'Email',
        field: 'email'
    }
];

@observer
export class PatientPage extends React.Component {
    handleOpenPageTable = page => {
        patientStore.getPatientsPage(page);
    }

    handlerOpenModalEdit = event => {
        event.preventDefault();
        patientStore.getPatientById(event.currentTarget.id);
        modalStore.open({
            title: 'Edit patient',
            content: <FormPatient patient={patientStore.patient}/>,
            buttons: <ButtonListEditModal />
        });
    }

    render() {
        return (
            <div className='page'>
                <MenuNavigation
                    menuItems={menuItems}
                    menuClassName='page__menu'/>
                <div className='page__content'>
                    <header className='content__header'>Patients Info</header>
                    <div className='content__general'>
                        <ButtonAddPatient />
                        <Grid
                            columns={columns}
                            handlerOpenModalEdit={this.handlerOpenModalEdit}
                            listItems={patientStore.patientList}/>
                        <Pagination
                            maxVisibleButtons={maxVisibleButtons}
                            totalItemsCount={patientStore.count}
                            pageSize={viewitems}
                            onChange={this.handleOpenPageTable} />
                    </div>
                </div>
            </div>
        );
    }
}
