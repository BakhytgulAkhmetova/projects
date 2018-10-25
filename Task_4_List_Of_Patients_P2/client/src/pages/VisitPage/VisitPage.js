import React from 'react';
import { observer } from 'mobx-react';

import { Grid } from '../../components/Grid';
import { Pagination } from '../../components/Pagination';
import { visitStore, modalStore } from '../../store';
import { MenuNavigation } from '../../components/MenuNavigation';
import { menuItems } from '../../store/data/data';
import { ButtonAddVisit } from './components/ButtonAddVisit';
import { FormVisit } from './components/FormVisit';
import { maxVisibleButtons, viewitems } from '../../constants';
import { ButtonsModalEdit } from './components/ButtonsModalEdit';

const columns = [
    {
        header: 'Patient',
        field: 'patient'
    },
    {
        header: 'Doctor',
        field: 'doctor'
    },
    {
        header: 'Description',
        field: 'description'
    },
    {
        header: 'Date',
        field: 'date'
    }
];

@observer
export class VisitPage extends React.Component {
    handleOpenPageTable = page => {
        visitStore.getVisitPage(visitStore.currentPage);
    }

    handlerOpenModalEdit =  event => {
        event.preventDefault();
        visitStore.getVisitById(event.currentTarget.id);
        modalStore.open({
            title: 'Edit visit',
            content: <FormVisit/>,
            buttons: <ButtonsModalEdit />
        });
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
                        <ButtonAddVisit
                            currentPage={visitStore.currentPage}/>
                        <Grid
                            columns={columns}
                            handlerOpenModalEdit={this.handlerOpenModalEdit}
                            listItems={visitStore.visitList} />
                        <Pagination
                            maxVisibleButtons={maxVisibleButtons}
                            totalItemsCount={visitStore.count}
                            pageSize={viewitems}
                            onChange={this.handleOpenPageTable} />
                    </div>
                </div>
            </div>
        );
    }
}
