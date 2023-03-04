import type { Component } from 'solid-js';
import { Route, Router, Routes } from '@solidjs/router';

import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import NotFound from './pages/error/NotFound';
import GithubCallback from './pages/OAuth/GithubCallback';
import Dashboard from './pages/Dashboard';

const App: Component = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
        {/* <Route path="/register" component={Register} /> */}
        <Route path="/about" component={About} />
        {/* <Route path="/products" component={Products} /> */}
        <Route path="/oauth/github" component={GithubCallback} />

        <Route path="/dashboard" component={Dashboard} />

        <Route path="*" component={NotFound} />
      </Routes>
    </Router>
  );
};

export default App;
