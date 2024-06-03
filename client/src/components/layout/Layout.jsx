import React from "react";
import AppDrawer from "./SideBar";
import MainContent from "./MainContent";
import { Box } from "@mui/material";

const Layout = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppDrawer />
        <MainContent />
      </Box>
    </>
  );
};

export default Layout;
