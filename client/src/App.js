import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import MyInvoices from "./pages/MyInvoices";
import MyCompanies from "./pages/MyCompanies";
import MyClients from "./pages/MyClients";

import Unauthorized from "./pages/Unauthorized";
import PrivateRoute from "./auth/PrivateRoute";
import { ProvideAuth } from "./auth/ProvideAuth";
import { routes } from "./common/configs";

const App = () => {
  return (
    <ProvideAuth>
      <Router>
        <Redirect from="/" to={routes.home} />

        <Layout>
          <Switch>
            <Route path={routes.home}>
              <Landing />
            </Route>
            <PrivateRoute path={routes.myInvoices}>
              <MyInvoices />
            </PrivateRoute>
            <PrivateRoute path={routes.myCompanies}>
              <MyCompanies />
            </PrivateRoute>
            <PrivateRoute path={routes.myClients}>
              <MyClients />
            </PrivateRoute>
            <Route path={routes.unauthorized}>
              <Unauthorized />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ProvideAuth>
  );
};

export default App;
