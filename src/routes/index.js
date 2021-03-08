import React from 'react';
import { useSelector } from 'react-redux';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

function Routes() {
  const { uid } = useSelector((state) => state.auth);

  return (uid ? <AppRoutes />
    : <AuthRoutes />
  );
}

export default Routes;
