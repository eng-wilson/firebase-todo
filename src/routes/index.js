import React from 'react';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

function Routes() {
  return (true ? <AppRoutes />
    : <AuthRoutes />
  );
}

export default Routes;
