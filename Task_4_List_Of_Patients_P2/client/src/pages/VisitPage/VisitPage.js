import React from 'react';
import { observer } from 'mobx-react';

import { Grid } from '../../components/Grid';
import { Pagination } from '../../components/Pagination';
import { visitStore, modalStore, maskStore } from '../../store';
import { MenuNavigation } from '../../components/MenuNavigation';
import { menuItems } from '../../store/data/data';
import { ButtonAddVisit } from './components/ButtonAddVisit';
import { maxVisibleButtons, viewitems, pathVisit } from '../../constants';
import { ContentEditModal } from './components/ContentEditModal';

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
    handleOpenPageTable = async page => {
        maskStore.open();
        await visitStore.getVisitPage(page);
        maskStore.close();
    }

    openModalEdit = async event => {
        maskStore.open();
        await visitStore.getVisitById(event.currentTarget.id);
        maskStore.close();
        modalStore.open({
            title: 'Edit visit',
            content: <ContentEditModal
                currentPage={visitStore.currentPage}
                visitModal={visitStore.visit} />
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
                            path={pathVisit}
                            columns={columns}
                            handlerOpenModalEdit={this.openModalEdit}
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
