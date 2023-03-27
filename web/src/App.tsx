import { Component, createEffect } from 'solid-js';
import { Route, Router, Routes } from '@solidjs/router';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Services from './pages/Services';
import Support from './pages/Support';
import About from './pages/About';
import NotFound from './pages/error/NotFound';
import GithubCallback from './pages/OAuth/GithubCallback';

import Dashboard from './pages/Dashboard/Dashboard';
import Overview from './pages/Dashboard/Overview';
import SiteAndSSL from './pages/Dashboard/SiteAndSSL';
import Database from './pages/Dashboard/Database';
import FileManager from './pages/Dashboard/FileManager';
import SSH from './pages/Dashboard/SSH';
import FTPS from './pages/Dashboard/FTPS';
import Metrics from './pages/Dashboard/Metrics';
import Snapshots from './pages/Dashboard/Snapshots';
import Events from './pages/Dashboard/Events';
import Guidance from './pages/Dashboard/Guidance';
import { authStore, login } from './stores/auth';
import { ls_keys } from './config/constants';

const App: Component = () => {
  const isLoggedIn = () => !!authStore.user

  createEffect(() => {
    if (isLoggedIn()) return
    if (!!localStorage.getItem(ls_keys.ACCESS_TOKEN)) {
      login('asd', 'asd')
    }
  })

  return (
    <Router>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/oauth/github" component={GithubCallback} />
        <Route path="/about" component={About} />
        <Route path="/products" component={Products} />
        <Route path="/services" component={Services} />
        <Route path="/support" component={Support} />

        {
          isLoggedIn() && (
            <Route path="/dashboard" component={Dashboard}>
              <Route path="/" component={Overview} />
              <Route path="/overview" component={Overview} />
              <Route path="/site-ssl" component={SiteAndSSL} />
              <Route path="/database" component={Database} />
              <Route path="/file-manager" component={FileManager} />
              <Route path="/ssh" component={SSH} />
              <Route path="/ftps" component={FTPS} />
              <Route path="/metrics" component={Metrics} />
              <Route path="/snapshots" component={Snapshots} />
              <Route path="/events" component={Events} />
              <Route path="/guidance-help" component={Guidance} />
            </Route>
          )
        }

        <Route path="*" component={NotFound} />
      </Routes>
    </Router>
  );
};

export default App;
