import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  Box,
} from "@mui/material";
import { Home, Person } from "@mui/icons-material";
import { Link } from "react-router-dom";

const MenuItems = () => {
  const [selectedItem, setSelectedItem] = useState();

  const items = [
    {
      id: 1,
      name: "Home",
      icon: <Home sx={{ color: "green" }} />,
      link: "/",
    },
    {
      id: 3,
      name: "About Me",
      icon: <Person sx={{ color: "green" }} />,
      link: "/about_me",
    },
  ];

  const handleOnClickSideBar = (id) => {
    setSelectedItem(id);
  };

  return (
    <>
      <Toolbar>
        <Box display="flex" alignItems="center" justifyContent="center">
          <img src="./logo2.png" height={40} />
        </Box>
      </Toolbar>
      <Divider />
      <List>
        {items.map((item) => (
          <Link
            to={item.link}
            key={item.id}
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                selected={selectedItem === item.id}
                onClick={() => handleOnClickSideBar(item.id)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );
};

export default MenuItems;
