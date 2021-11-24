import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './helpers/i18n';
import Spinner from './components/spinner';

ReactDOM.render(
    <React.StrictMode>
        <Suspense fallback={<Spinner />}>
            <BrowserRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </BrowserRouter>
        </Suspense>
    </React.StrictMode>,
    document.getElementById('root')
);
