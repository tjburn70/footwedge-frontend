import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { MainPage } from './pages';
import { AppRouter } from './routes/app-router';
import { history } from './routes/history';

const queryClient = new QueryClient();


ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router history={history}>
        <MainPage />
        <AppRouter />
      </Router>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
