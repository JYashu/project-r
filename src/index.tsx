import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import ProviderWithRouter from './components/ProviderWithRouter';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ProviderWithRouter>
        <App />
      </ProviderWithRouter>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
