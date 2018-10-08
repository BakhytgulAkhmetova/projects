import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { NotFound } from './pages/NotFound/NotFound';

export const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route
                    exact path='/'
                    component={HomePage} />
                <Route
                    exact path='/visits'
                    component={HomePage} />
                <Route
                    exact path='*'
                    component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
};
