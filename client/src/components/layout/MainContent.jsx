import Box from "@mui/material/Box";
import { Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

const MainContent = () => {
  const drawerWidth = 240;

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </>
  );
};

export default MainContent;
