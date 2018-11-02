import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { PatientPage } from './pages/PatientPage';
import { VisitPage } from './pages/VisitPage';
import { NotFound } from './pages/NotFound/NotFound';
import { ModalView } from './components/ModalView';
import { Mask } from './components/Mask';

export const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route
                        exact path='/'
                        component={PatientPage} />
                    <Route
                        path='/patients'
                        component={PatientPage} />
                    <Route
                        path='/visits'
                        component={VisitPage} />
                    <Route
                        path='*'
                        component={NotFound} />

                </Switch>
            </BrowserRouter>
            <ModalView />
            <Mask/>
        </div>
    );
};
