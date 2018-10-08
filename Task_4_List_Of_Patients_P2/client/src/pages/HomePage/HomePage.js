import React from 'react';
import { observer } from 'mobx-react';

import { ModalView } from '../../components/ModalView';
import { ButtonAdd } from '../../components/ButtonOpenAddModal';
import { Grid } from '../../components/Grid';
import { Pagination } from '../../components/Pagination';
import { patientStore } from '../../store';
import { MenuNavigation } from '../../components/MenuNavigation';
import { menuItems } from '../../store/data/data';

import './HomePage.scss';

@observer
export class HomePage extends React.Component {
    componentDidMount() {
        patientStore.getPatientsPage();
    }

    render() {
        return (
            <div className='page'>
                <MenuNavigation
                    menuItems={menuItems}
                    menuClassName='page__menu'/>
                <div className='page__content'>
                    <header className='header'>Patients Info</header>
                    <div className='content-home-page'>
                        <ButtonAdd />
                        <Grid patientList={patientStore.patientList} />
                        <Pagination maxViewBtns={3} maxViewPatients={4} />
                        <ModalView />
                    </div>
                </div>
            </div>
        );
    }
}
