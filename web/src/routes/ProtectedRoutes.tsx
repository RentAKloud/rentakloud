import { Component, Show, lazy } from "solid-js";
import { Outlet, Route } from "@solidjs/router";

const Checkout = lazy(() => import('~/pages/Checkout/Checkout'));

import InstanceDashboard from '~/pages/InstanceDashboard/InstanceDashboard';
import Overview from '~/pages/InstanceDashboard/Overview';
const VNC = lazy(() => import("~/pages/InstanceDashboard/VNC"));
import SSH from '~/pages/InstanceDashboard/SSH';
import SiteAndSSL from '~/pages/InstanceDashboard/SiteAndSSL';
import Database from '~/pages/InstanceDashboard/Database';
import FileManager from '~/pages/InstanceDashboard/FileManager';
import FTPS from '~/pages/InstanceDashboard/FTPS';
import Metrics from '~/pages/InstanceDashboard/Metrics';
import Snapshots from '~/pages/InstanceDashboard/Snapshots';
import Events from '~/pages/InstanceDashboard/Events';
import InstanceSettings from "~/pages/InstanceDashboard/InstanceSettings";
import Guidance from '~/pages/InstanceDashboard/Guidance';

import Dashboard from '~/pages/Dashboard/Dashboard';
import DashboardHome from '~/pages/Dashboard/Home';
import Orders from '~/pages/Dashboard/Orders';
import Order from "~/pages/Orders/Order";
import Billing from '~/pages/Dashboard/Billing';
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
      <Route path="/instances/:id" component={InstanceDashboard}>
        <Route path={["/", "/overview"]} component={Overview} />
        <Route path="/stream" component={VNC} />
        <Route path="/site-ssl" component={SiteAndSSL} />
        <Route path="/database" component={Database} />
        <Route path="/file-manager" component={FileManager} />
        <Route path="/ssh" component={SSH} />
        <Route path="/ftps" component={FTPS} />
        <Route path="/metrics" component={Metrics} />
        <Route path="/snapshots" component={Snapshots} />
        <Route path="/events" component={Events} />
        <Route path="/settings" component={InstanceSettings} />
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
        <Route path="/orders">
          <Route path="/" component={Orders} />
          <Route path="/:id" component={Order} />
        </Route>
        <Route path="/billing" component={Billing} />
        <Route path="/settings" component={Settings} />
      </Route>

      <Route path="/checkout" component={Checkout} />
    </Route>
  )
}

export default ProtectedRoutes