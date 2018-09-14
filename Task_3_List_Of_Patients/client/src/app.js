import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { HomePage } from './pages/homePage';

export const App = () => {
    return (
        <BrowserRouter>
            <Route
                exact path='/'
                component={HomePage} />
        </BrowserRouter>
    );
};
