import React from "react";

import { Route, Redirect } from "react-router-dom";
import { ROUTES } from "../common/configs";

import { useAuth } from "./ProvideAuth";

const PrivateRoute = ({ children, ...rest }) => {
  let auth = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: ROUTES.unauthorized,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
