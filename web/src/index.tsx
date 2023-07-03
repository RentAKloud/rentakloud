/* @refresh reload */
import { render } from 'solid-js/web';

import App from './App';
import './index.css';
import { Router } from '@solidjs/router';
import * as Sentry from "@sentry/browser"
import { SENTRY_DSN } from './config/constants';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  );
}

Sentry.init({ dsn: SENTRY_DSN })

render(() => (
  <Router>
    <App />
  </Router>
), root!);
