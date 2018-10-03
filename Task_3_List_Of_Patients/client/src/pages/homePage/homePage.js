import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import { ModalView } from '../../components/ModalView';
import { ButtonAdd } from '../../components/ButtonOpenAddModal';
import { Grid } from '../../components/Grid';
import { Pagination } from '../../components/Pagination';
import { patientStore } from '../../store';

import './HomePage.scss';

@observer
export class HomePage extends React.Component {
    static propTypes = {
        patientStore: PropTypes.object
    }

    componentDidMount() {
        patientStore.getPatientsPage();
    }

    render() {
        return (
            <div>
                <header className='header'>Patients Info</header>
                <div className='content-home-page'>
                    <ButtonAdd />
                    <Grid patientList={patientStore.patientList}/>
                    <Pagination
                        maxViewBtns = {3}
                        maxViewPatients = {4}/>
                    <ModalView />
                </div>
            </div >
        );
    }
}
