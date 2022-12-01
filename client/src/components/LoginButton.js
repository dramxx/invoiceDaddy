import React from "react";
import { useHistory, useLocation } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { useAuth } from "../auth/ProvideAuth";
import { ROUTES } from "../common/configs";

const LoginButton = () => {
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  const dummyUser = {
    email: "drahoslav.madar@gmail.com",
    password: "123456abc",
  };

  let { from } = location.state || { from: { pathname: ROUTES.home } };

  const handleLogin = () => {
    auth.signin(() => {
      history.replace(from);
    }, dummyUser);
  };

  return (
    !auth.user && (
      <IconButton
        size="small"
        color="inherit"
        aria-label="menu"
        onClick={() => handleLogin()}
      >
        <Typography variant="h8" style={{ marginRight: "20px" }}>
          Login
        </Typography>
      </IconButton>
    )
  );
};

export default LoginButton;
