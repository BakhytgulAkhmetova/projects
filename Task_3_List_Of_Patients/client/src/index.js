import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import { App } from './app';
import { store } from './store';

import './index.scss';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
