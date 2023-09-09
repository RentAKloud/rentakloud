import { Component, Show, lazy } from "solid-js";
import { Outlet, Route } from "@solidjs/router";

const Checkout = lazy(() => import('~/pages/Checkout/Checkout'));

import ProductDashboard from '~/pages/ProductDashboard/ProductDashboard';
import Overview from '~/pages/ProductDashboard/Overview';
import SiteAndSSL from '~/pages/ProductDashboard/SiteAndSSL';
import Database from '~/pages/ProductDashboard/Database';
import FileManager from '~/pages/ProductDashboard/FileManager';
import SSH from '~/pages/ProductDashboard/SSH';
import FTPS from '~/pages/ProductDashboard/FTPS';
import Metrics from '~/pages/ProductDashboard/Metrics';
import Snapshots from '~/pages/ProductDashboard/Snapshots';
import Events from '~/pages/ProductDashboard/Events';
import Guidance from '~/pages/ProductDashboard/Guidance';

import Dashboard from '~/pages/Dashboard/Dashboard';
import DashboardHome from '~/pages/Dashboard/Home';
import Orders from '~/pages/Dashboard/Orders';
import Payments from '~/pages/Dashboard/Payments';
import Settings from '~/pages/Dashboard/Settings';
import Instances from '~/pages/Dashboard/Instances';
import Images from '~/pages/Dashboard/Images';
import Backups from '~/pages/Dashboard/Backups';
import InstancesNew from '~/pages/Instances/New';
import { authStore } from "~/stores/auth";
import Login from "~/pages/Login";

export const protectedRoots = ["products", "dashboard", "checkout"]

const Protected = () => {
  const isLoggedIn = () => !!authStore.user

  return (
    <Show when={isLoggedIn()} fallback={<Login />}>
      <Outlet />
    </Show>
  )
}

const ProtectedRoutes: Component = () => {

  return (
    <Route path="" component={Protected}>
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
    </Route>
  )
}

export default ProtectedRoutes