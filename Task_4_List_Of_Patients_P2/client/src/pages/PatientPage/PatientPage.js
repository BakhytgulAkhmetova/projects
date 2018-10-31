import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import { ButtonAddPatient } from './components/ButtonOpenAddModal';
import { Grid } from '../../components/Grid';
import { Pagination } from '../../components/Pagination';
import { patientStore, modalStore } from '../../store';
import { MenuNavigation } from '../../components/MenuNavigation';
import { menuItems } from '../../store/data/data';
import { maxVisibleButtons, viewitems } from '../../constants';
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
    static propTypes = {
        currentPage: PropTypes.number
    }

    handleOpenPageTable = page => {
        patientStore.getPatientsPage(page);
    }

    handlerOpenModalEdit = event => {
        patientStore.getPatientById(event.currentTarget.id);
        modalStore.open({
            title: 'Edit patient',
            content: <ContentEditModal
                currentPage={patientStore.currentPage}
                patient={patientStore.patient}/>
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
                            columns={columns}
                            handlerOpenModalEdit={this.handlerOpenModalEdit}
                            listItems={patientStore.patientList}/>
                        <Pagination
                            id={1}
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
