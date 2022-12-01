import React from "react";
import { useHistory } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { useAuth } from "../auth/ProvideAuth";
import { ROUTES } from "../common/configs";

const LogoutButton = () => {
  let history = useHistory();
  let auth = useAuth();

  const handleLogout = () => {
    auth.signout(() => history.push(ROUTES.home));
  };

  return (
    auth.user && (
      <IconButton
        size="small"
        color="inherit"
        aria-label="menu"
        onClick={() => handleLogout()}
      >
        <Typography variant="h8" style={{ marginRight: "20px" }}>
          Logout
        </Typography>
      </IconButton>
    )
  );
};

export default LogoutButton;
