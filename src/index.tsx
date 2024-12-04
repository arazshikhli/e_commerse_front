import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import i18n from './i18n';
import {BrowserRouter as Router} from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <GoogleOAuthProvider clientId='798950239493-0pm1ujc3r89kknh30kr2rilsnmqbbhrg.apps.googleusercontent.com'>
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
  </GoogleOAuthProvider>
);
