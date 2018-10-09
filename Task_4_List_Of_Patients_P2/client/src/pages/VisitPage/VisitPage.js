import React from 'react';
import { observer } from 'mobx-react';

import { ModalView } from '../../components/ModalView';
import { ButtonAdd } from '../../components/ButtonOpenAddModal';
import { Grid } from '../../components/Grid';
import { Pagination } from '../../components/Pagination';
import { visitStore } from '../../store';
import { MenuNavigation } from '../../components/MenuNavigation';
import { menuItems } from '../../store/data/data';

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
                        <ButtonAdd />
                        <Grid listItems={visitStore.visitList} />
                        <Pagination/>
                        <ModalView />
                    </div>
                </div>
            </div>
        );
    }
}
