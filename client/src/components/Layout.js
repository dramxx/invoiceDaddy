import React from "react";

import { Box } from "@mui/material";

import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <Box>
      <Header />
      <Box style={{ margin: "25px" }}>{children}</Box>
    </Box>
  );
};

export default Layout;
