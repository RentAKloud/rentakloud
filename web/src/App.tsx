import { Component, createEffect } from 'solid-js';
import { Route, Routes } from '@solidjs/router';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products/Products';
import ProductDetail from './pages/Products/ProductDetail';
import Services from './pages/Services';
import Support from './pages/Support';
import About from './pages/About';
import NotFound from './pages/error/NotFound';
import GithubCallback from './pages/OAuth/GithubCallback';
import Cart from './pages/Cart';
import LegalHome from './pages/Legal/LegalHome';
import PrivacyPolicy from './pages/Legal/PrivacyPolicy';

import Checkout from './pages/Checkout/Checkout';

import ProductDashboard from './pages/ProductDashboard/ProductDashboard';
import Overview from './pages/ProductDashboard/Overview';
import SiteAndSSL from './pages/ProductDashboard/SiteAndSSL';
import Database from './pages/ProductDashboard/Database';
import FileManager from './pages/ProductDashboard/FileManager';
import SSH from './pages/ProductDashboard/SSH';
import FTPS from './pages/ProductDashboard/FTPS';
import Metrics from './pages/ProductDashboard/Metrics';
import Snapshots from './pages/ProductDashboard/Snapshots';
import Events from './pages/ProductDashboard/Events';
import Guidance from './pages/ProductDashboard/Guidance';

import Dashboard from './pages/Dashboard/Dashboard';
import DashboardHome from './pages/Dashboard/Home';
import Orders from './pages/Dashboard/Orders';
import Payments from './pages/Dashboard/Payments';
import Settings from './pages/Dashboard/Settings';
import Instances from './pages/Dashboard/Instances';
import Images from './pages/Dashboard/Images';
import Backups from './pages/Dashboard/Backups';
import { authStore, getUserProfile } from './stores/auth';
import InstancesNew from './pages/Instances/New';

const App: Component = () => {
  const isLoggedIn = () => !!authStore.user

  createEffect(() => {
    if (isLoggedIn()) return
    if (authStore.access_token) {
      // TODO check if token expired, then logout
      // if not then fetch user info
      getUserProfile()
    }
  })

  return (
    <Routes>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/oauth/github" component={GithubCallback} />
      <Route path="/about" component={About} />
      <Route path="/our-products">
        <Route path="/" component={Products} />
        <Route path="/:slug" component={ProductDetail} />
      </Route>
      <Route path="/services" component={Services} />
      <Route path="/support" component={Support} />
      <Route path="/cart" component={Cart} />

      <Route path="/legal">
        <Route path="/" component={LegalHome} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
      </Route>

      {
        isLoggedIn() && (
          <>
            <Route path="/products/:id" component={ProductDashboard}>
              <Route path={["/", "/overview"]} component={Overview} />
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

            <Route path="/dashboard" component={Dashboard}>
              <Route path={["/", "/overview"]} component={DashboardHome} />
              <Route path="/instances">
                <Route path="/" component={Instances} />
                <Route path="/new" component={InstancesNew} />
              </Route>
              <Route path="/images" component={Images} />
              <Route path="/backups" component={Backups} />
              <Route path="/orders" component={Orders} />
              <Route path="/payments" component={Payments} />
              <Route path="/settings" component={Settings} />
            </Route>


            <Route path="/checkout" component={Checkout} />
          </>
        )
      }

      <Route path="*" component={NotFound} />
    </Routes>
  );
};

export default App;
