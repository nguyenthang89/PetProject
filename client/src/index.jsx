import store from './store';
import ReactDOM from 'react-dom/client';
import React, { StrictMode } from 'react';

import { Application } from './App';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <StrictMode>
      <BrowserRouter>
        <StoreProvider store={store}>
          <Application />
        </StoreProvider>
      </BrowserRouter>
    </StrictMode>
);