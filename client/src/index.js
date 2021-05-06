import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Amplify from 'aws-amplify';

import { AuthProvider } from './context/auth/auth-provider';
import { appConfig } from './modules/config';
import { MainPage } from './pages';
import { AppRouter } from './routes/app-router';
import { history } from './routes/history';

Amplify.configure({ ...appConfig.auth, storage: window.localStorage });
const queryClient = new QueryClient();


ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router history={history}>
          <MainPage />
          <AppRouter />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
