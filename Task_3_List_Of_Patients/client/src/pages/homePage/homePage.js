import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import { ModalView } from '../../components/modalView';
import { ButtonAdd } from '../../components/buttonOpenAddModal';
import { Grid } from '../../components/grid';
import { Pagination } from '../../components/pagination';
import { patientStore } from '../../store';

import './homePage.scss';

@observer
export class HomePage extends React.Component {
    static propTypes = {
        patientStore: PropTypes.object
    }

    componentDidMount() {
        patientStore.getPage();
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
