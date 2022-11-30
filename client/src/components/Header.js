import * as React from "react";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AutoAwesome from "@mui/icons-material/AutoAwesome";

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

import { routes } from "../common/configs";

const linkStyles = {
  textDecoration: "none",
  color: "inherit",
};

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Link to={routes.home} style={linkStyles}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  style={{ marginRight: "20px" }}
                >
                  <AutoAwesome />
                  invoiceDaddy
                </Typography>
              </IconButton>
            </Link>

            <Link to={routes.myInvoices} style={linkStyles}>
              <IconButton size="small" color="inherit" aria-label="menu">
                <Typography variant="h8" style={{ marginRight: "20px" }}>
                  My Invoices
                </Typography>
              </IconButton>
            </Link>

            <Link to={routes.myCompanies} style={linkStyles}>
              <IconButton size="small" color="inherit" aria-label="menu">
                <Typography variant="h8" style={{ marginRight: "20px" }}>
                  My Companies
                </Typography>
              </IconButton>
            </Link>

            <Link to={routes.myClients} style={linkStyles}>
              <IconButton size="small" color="inherit" aria-label="menu">
                <Typography variant="h8" style={{ marginRight: "20px" }}>
                  My Clients
                </Typography>
              </IconButton>
            </Link>
          </Box>

          <Box>
            <LoginButton />
            <LogoutButton />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
