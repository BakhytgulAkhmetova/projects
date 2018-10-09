import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { PatientPage } from './pages/PatientPage';
import { VisitPage } from './pages/VisitPage';
import { NotFound } from './pages/NotFound/NotFound';

export const App = () => {
    return (
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
    );
};
