import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import 'scss/index.scss';
import { BrowserRouter } from 'react-router-dom';
import App from 'app/App';

const { PUBLIC_URL } = process.env;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
              <StrictMode>
                <BrowserRouter basename={PUBLIC_URL} >
                  <App />
                </BrowserRouter>
              </StrictMode>
            );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
