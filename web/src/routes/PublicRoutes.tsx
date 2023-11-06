import { Route } from "@solidjs/router";
import { Component, lazy } from "solid-js";

import Home from '~/pages/Home';
const Login = lazy(() => import('~/pages/Login'));
const Register = lazy(() => import('~/pages/Register'));
const ForgotPassword = lazy(() => import("~/pages/ForgotPassword"));
import Products from '~/pages/Products/Products';
import ProductDetail from '~/pages/Products/ProductDetail';
import Services from '~/pages/Services';
import Support from '~/pages/Support';
const About = lazy(() => import('~/pages/About'));
import GithubCallback from '~/pages/OAuth/GithubCallback';
import Cart from '~/pages/Cart';
const PaymentMethods = lazy(() => import('~/pages/Legal/PaymentMethods'));
const LegalHome = lazy(() => import('~/pages/Legal/LegalHome'));
const PrivacyPolicy = lazy(() => import('~/pages/Legal/PrivacyPolicy'));
const CookiePolicy = lazy(() => import('~/pages/Legal/CookiePolicy'));
const RefundPolicy = lazy(() => import('~/pages/Legal/RefundPolicy'));
const DeliveryPolicy = lazy(() => import('~/pages/Legal/DeliveryPolicy'));
const TermsOfService = lazy(() => import('~/pages/Legal/TermsOfService'));

const PublicRoutes: Component = () => {
  return (
    <>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/forgot-password" component={ForgotPassword} />
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
        <Route path="/refund-policy" component={RefundPolicy} />
        <Route path="/cookie-policy" component={CookiePolicy} />
        <Route path="/delivery-policy" component={DeliveryPolicy} />
        <Route path="/terms-of-service-agreement" component={TermsOfService} />
      </Route>
      <Route path="payment-methods" component={PaymentMethods} />
    </>
  )
}

export default PublicRoutes