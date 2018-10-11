import React from 'react';
import { observer } from 'mobx-react';

import { ModalView } from '../../components/ModalView';
import { ButtonAdd } from '../../components/ButtonOpenAddModal';
import { Grid } from '../../components/Grid';
import { Pagination } from '../../components/Pagination';
import { patientStore, paginationStore } from '../../store';
import { MenuNavigation } from '../../components/MenuNavigation';
import { menuItems } from '../../store/data/data';
import { maxVisibleButtons, viewitems } from '../../constants';

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
    componentDidMount() {
        patientStore.getPatientsPage(paginationStore.currentPage);
    }

    componentDidUpdate() {
        patientStore.getPatientsPage(paginationStore.currentPage);
    }

    handleOpenPageTable = event => {
        event.preventDefault();
        paginationStore.setStartEndbuttons(+event.target.id);
        paginationStore.changeCurrentPage(+event.target.id);
        patientStore.getPatientsPage(paginationStore.currentPage);
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
                        <ButtonAdd />
                        <Grid
                            columns={columns}
                            listItems={patientStore.patientList}/>
                        <Pagination
                            maxVisibleButtons={maxVisibleButtons}
                            currentPage={paginationStore.currentPage}
                            items={patientStore.count}
                            viewitems={viewitems}
                            onHandleOpenPageTable={this.handleOpenPageTable} />
                        <ModalView />
                    </div>
                </div>
            </div>
        );
    }
}
