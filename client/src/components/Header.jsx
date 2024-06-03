import React from "react";
import { Typography, Box, Button } from "@mui/material";

const Header = ({ title, action }) => {
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ marginBottom: "20px" }}
      >
        <Typography sx={{ color: "green" }} variant="h4">
          {title}
        </Typography>
        {action ? (
          <Button sx={{background: "green"}} onClick={() => action?.onClick()} variant="contained">
            {action?.label}
          </Button>
        ) : (
          <div></div>
        )}
      </Box>
    </>
  );
};

export default Header;
