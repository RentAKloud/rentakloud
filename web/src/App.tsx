import { Component, Suspense, createEffect } from "solid-js";
import { Route, Routes, useLocation, useNavigate } from "@solidjs/router";

import { authStore, getUserProfile } from "./stores/auth";

import PublicRoutes from "./routes/PublicRoutes";
import ProtectedRoutes, { protectedRoots } from "./routes/ProtectedRoutes";
import NotFound from "./pages/error/NotFound";
import Loader from "./components/Loader";

const App: Component = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = () => !!authStore.user;

  createEffect(() => {
    if (isLoggedIn()) return;
    // if logged out and on protected route
    const currentRoute = location.pathname + location.search;
    if (protectedRoots.includes(currentRoute.split("/")[1])) {
      navigate(`/login?next=${encodeURIComponent(currentRoute)}`);
    }

    if (authStore.access_token) {
      // TODO check if token expired, then logout
      // if not then fetch user info
      getUserProfile();
    }
  });

  return (
    <Suspense fallback={<Loader fullScreen />}>
      <Routes>
        <PublicRoutes />

        <ProtectedRoutes />

        <Route path="*" component={NotFound} />
      </Routes>
    </Suspense>
  );
};

export default App;
