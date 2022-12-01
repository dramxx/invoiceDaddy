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
import { ROUTES } from "./common/configs";

const App = () => {
  return (
    <ProvideAuth>
      <Router>
        <Redirect from="/" to={ROUTES.home} />

        <Layout>
          <Switch>
            <Route path={ROUTES.home}>
              <Landing />
            </Route>
            <PrivateRoute path={ROUTES.myInvoices}>
              <MyInvoices />
            </PrivateRoute>
            <PrivateRoute path={ROUTES.myCompanies}>
              <MyCompanies />
            </PrivateRoute>
            <PrivateRoute path={ROUTES.myClients}>
              <MyClients />
            </PrivateRoute>
            <Route path={ROUTES.unauthorized}>
              <Unauthorized />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ProvideAuth>
  );
};

export default App;
