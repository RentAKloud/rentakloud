import { Component, createEffect } from 'solid-js';
import { Route, Routes, useLocation, useNavigate } from '@solidjs/router';

import { authStore, getUserProfile } from './stores/auth';

import PublicRoutes from './routes/PublicRoutes';
import ProtectedRoutes, { protectedRoots } from './routes/ProtectedRoutes';
import NotFound from './pages/error/NotFound';

const App: Component = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isLoggedIn = () => !!authStore.user

  createEffect(() => {
    if (isLoggedIn()) return
    if (authStore.access_token) {
      // TODO check if token expired, then logout
      // if not then fetch user info
      getUserProfile()
    }

    // if logged out and on protected route
    const currentRoute = location.pathname
    if (protectedRoots.includes(currentRoute.split('/')[1])) {
      navigate(`/login?next=${currentRoute}`)
    }
  })

  return (
    <Routes>
      <PublicRoutes />

      {
        isLoggedIn() && (
          <ProtectedRoutes />
        )
      }

      <Route path="*" component={NotFound} />
    </Routes>
  );
};

export default App;
