import React from 'react';
import { observer } from 'mobx-react';

import { Grid } from '../../components/Grid';
// import { Pagination } from '../../components/Pagination';
import { visitStore } from '../../store';
import { MenuNavigation } from '../../components/MenuNavigation';
import { menuItems } from '../../store/data/data';
import { ButtonAddVisit } from './components/ButtonOpenAddModal';

const columns = [
    {
        header: 'Description',
        field: 'description'
    },
    {
        header: 'Patient',
        field: 'patient'
    },
    {
        header: 'Doctor',
        field: 'doctor'
    },
    {
        header: 'Date',
        field: 'date'
    }
];

@observer
export class VisitPage extends React.Component {
    componentDidMount() {
        visitStore.getAllVisits();
    }

    render() {
        return (
            <div className='page'>
                <MenuNavigation
                    menuItems={menuItems}
                    menuClassName='page__menu'/>
                <div className='page__content'>
                    <header className='content__header'>Visits Info</header>
                    <div className='content__general'>
                        <ButtonAddVisit />
                        <Grid
                            columns={columns}
                            listItems={visitStore.visitList} />
                        {/* <Pagination/> */}
                    </div>
                </div>
            </div>
        );
    }
}
