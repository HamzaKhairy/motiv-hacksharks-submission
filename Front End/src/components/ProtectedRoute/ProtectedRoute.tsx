import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { callbackUri } from "../../auth.config";

interface ProtectedRouteProps extends RouteProps {
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  if (!Component) return null;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return <Component {...props} />;
        } else {
          const returnUrl = `${callbackUri}${props.location.pathname}`;
          loginWithRedirect({ appState: { returnTo: returnUrl } });
          return null;
        }
      }}
    />
  );
};

export default ProtectedRoute;