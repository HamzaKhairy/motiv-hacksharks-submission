import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from 'react-redux';
import { isPlatform } from "@ionic/react";
import App from './App';
import store from './redux/store';


import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { domain as auth0Domain, clientId, callbackUri } from "./auth.config";
import newUser from './pages/newUser/newUser';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <Auth0Provider
      domain={auth0Domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: callbackUri
      }}
      // For using Auth0-React with Ionic on Android and iOS,
      // it's important to use refresh tokens without the fallback
      useRefreshTokens={true}
      useRefreshTokensFallback={false}
      cacheLocation="localstorage"
    >
      <App />
    </Auth0Provider>
    </Provider>
  </React.StrictMode>
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
