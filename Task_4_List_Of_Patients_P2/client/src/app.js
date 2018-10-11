import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { PatientPage } from './pages/PatientPage';
import { VisitPage } from './pages/VisitPage';
import { NotFound } from './pages/NotFound/NotFound';
import { ModalView } from './components/ModalView';

export const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route
                        exact path='/'
                        component={PatientPage} />
                    <Route
                        exact path='/patients'
                        component={PatientPage} />
                    <Route
                        exact path='/visits'
                        component={VisitPage} />
                    <Route
                        exact path='*'
                        component={NotFound} />

                </Switch>
            </BrowserRouter>
            <ModalView />
        </div>
    );
};
