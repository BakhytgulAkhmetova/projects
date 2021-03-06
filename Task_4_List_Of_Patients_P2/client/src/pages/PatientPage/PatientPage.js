import React from 'react';
import { observer } from 'mobx-react';

import { ButtonAddPatient } from './components/ButtonOpenAddModal';
import { Grid } from '../../components/Grid';
import { Pagination } from '../../components/Pagination';
import { patientStore, modalStore, maskStore } from '../../store';
import { MenuNavigation } from '../../components/MenuNavigation';
import { menuItems } from '../../store/data/data';
import { maxVisibleButtons, viewitems, pathPatient } from '../../constants';
import { ContentEditModal } from './components/ContentEditModal';

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
    handleOpenPageTable = async page => {
        maskStore.open();
        await patientStore.getPatientsPage(page);
        maskStore.close();
    }

    openModalEdit = async event => {
        maskStore.open();
        await patientStore.getPatientById(event.currentTarget.id);
        maskStore.close();
        modalStore.open({
            title: 'Edit patient',
            content: <ContentEditModal
                currentPage={patientStore.currentPage}
                patientModal={patientStore.patient}/>
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
                        <ButtonAddPatient
                            currentPage={patientStore.currentPage}/>
                        <Grid
                            path={pathPatient}
                            columns={columns}
                            handlerOpenModalEdit={this.openModalEdit}
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
