import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from 'react-router-dom';
import { AppRouter } from './routes/app-router';
import { history } from './routes/history';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <AppRouter />
    </Router>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);
