import { Route } from "@solidjs/router";
import { Component } from "solid-js";

import Checkout from '../pages/Checkout/Checkout';

import ProductDashboard from '../pages/ProductDashboard/ProductDashboard';
import Overview from '../pages/ProductDashboard/Overview';
import SiteAndSSL from '../pages/ProductDashboard/SiteAndSSL';
import Database from '../pages/ProductDashboard/Database';
import FileManager from '../pages/ProductDashboard/FileManager';
import SSH from '../pages/ProductDashboard/SSH';
import FTPS from '../pages/ProductDashboard/FTPS';
import Metrics from '../pages/ProductDashboard/Metrics';
import Snapshots from '../pages/ProductDashboard/Snapshots';
import Events from '../pages/ProductDashboard/Events';
import Guidance from '../pages/ProductDashboard/Guidance';

import Dashboard from '../pages/Dashboard/Dashboard';
import DashboardHome from '../pages/Dashboard/Home';
import Orders from '../pages/Dashboard/Orders';
import Payments from '../pages/Dashboard/Payments';
import Settings from '../pages/Dashboard/Settings';
import Instances from '../pages/Dashboard/Instances';
import Images from '../pages/Dashboard/Images';
import Backups from '../pages/Dashboard/Backups';
import InstancesNew from '../pages/Instances/New';

export const protectedRoots = ["products", "dashboard", "checkout"]

const ProtectedRoutes: Component = () => {
  return (
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

export default ProtectedRoutes