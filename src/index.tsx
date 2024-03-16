import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app';
import ProviderWithRouter from './components/providerWithRouter';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/project-r">
      <ProviderWithRouter>
        <App />
      </ProviderWithRouter>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
