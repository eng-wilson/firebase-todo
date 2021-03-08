import React from 'react';
import { useSelector } from 'react-redux';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import Header from '../components/Header';

function Routes() {
  const { uid } = useSelector((state) => state.auth);

  return (uid ? (
    <>
      <Header />
      <AppRoutes />
    </>
  )
    : <AuthRoutes />
  );
}

export default Routes;
