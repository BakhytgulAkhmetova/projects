import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { HomePage } from './pages/homePage';
import { NotFound } from './pages/notFound';

export const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route
                    exact path='/'
                    component={HomePage} />
                <Route
                    exact path='*'
                    component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
};
