import { Route } from "@solidjs/router";
import { Component, lazy } from "solid-js";

import Home from '~/pages/Home';
const Login = lazy(() => import('~/pages/Login'));
const Register = lazy(() => import('~/pages/Register'));
import Products from '~/pages/Products/Products';
import ProductDetail from '~/pages/Products/ProductDetail';
import Services from '~/pages/Services';
import Support from '~/pages/Support';
import About from '~/pages/About';
import GithubCallback from '~/pages/OAuth/GithubCallback';
import Cart from '~/pages/Cart';
const LegalHome = lazy(() => import('~/pages/Legal/LegalHome'));
const PrivacyPolicy = lazy(() => import('~/pages/Legal/PrivacyPolicy'));
const TermsOfService = lazy(() => import('~/pages/Legal/TermsOfService'));

const PublicRoutes: Component = () => {
  return (
    <>
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
        <Route path="/terms-of-service-agreement" component={TermsOfService} />
      </Route>
    </>
  )
}

export default PublicRoutes