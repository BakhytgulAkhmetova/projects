import React from 'react';
import { observer } from 'mobx-react';
// import PropTypes from 'prop-types';

import { ModalView } from '../../components/ModalView';
import { ButtonAdd } from '../../components/ButtonOpenAddModal';
import { Grid } from '../../components/Grid';
import { Pagination } from '../../components/Pagination';
import { patientStore, paginationStore } from '../../store';
import { MenuNavigation } from '../../components/MenuNavigation';
import { menuItems } from '../../store/data/data';

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
        patientStore.getPatientsPage();
        // paginationStore.setBaseValues(3);
        // paginationStore.setMaxCount(4, patientStore.count);
        // paginationStore.setStartButton();
        // paginationStore.setEndButton();
    }

    componentWillReceiveProps() {
        paginationStore.setMaxCount(4, patientStore.count);
        paginationStore.setStartEndbuttons();
    }

    handleOpenPageTable = event => {
        event.preventDefault();
        paginationStore.setCurrent(event.target.id);
        paginationStore.setStartEndbuttons();
        patientStore.getPatientsPage();
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
                        <Pagination onHandleOpenPageTable={this.handleOpenPageTable} />
                        <ModalView />
                    </div>
                </div>
            </div>
        );
    }
}
