import React from 'react';
import { observer } from 'mobx-react';

import { ModalView } from '../../components/ModalView';
import { ButtonAdd } from '../../components/ButtonOpenAddModal';
import { Grid } from '../../components/Grid';
import { Pagination } from '../../components/Pagination';
import { patientStore, paginationStore } from '../../store';
import { MenuNavigation } from '../../components/MenuNavigation';
import { menuItems } from '../../store/data/data';

import './PatientPage.scss';

@observer
export class PatientPage extends React.Component {
    componentDidMount() {
        patientStore.getPatientsPage();
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
                        <Grid listItems={patientStore.patientList}/>
                        <Pagination onHandleOpenPageTable={this.handleOpenPageTable} />
                        <ModalView />
                    </div>
                </div>
            </div>
        );
    }
}
