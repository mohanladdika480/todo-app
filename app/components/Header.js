"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { logout } from "../../store/authSlice";
import { styled } from "@mui/material/styles";

const StyledListItem = styled(ListItem)(({ theme }) => ({
  fontWeight: "bold",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("/");

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleNavigation = (path) => {
    setActiveTab(path);
    router.push(path);
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          {isAuthenticated && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(!drawerOpen)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: "semi-bold" }}
          >
            Todo App
          </Typography>
          {isAuthenticated && (
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{
                fontWeight: "semi-bold",
                textTransform: "none",
                fontSize: "16px",
              }}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          zIndex: 1099,
          "& .MuiBackdrop-root": {
            backgroundColor: "transparent",
          },
        }}
      >
        <Box
          sx={{ width: 250, mt: "72px" }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <StyledListItem
              onClick={() => handleNavigation("/")}
              sx={activeTab === "/" ? { backgroundColor: "#e0caa9" } : {}}
            >
              <ListItemText primary="Todo List" />
            </StyledListItem>
            <StyledListItem
              onClick={() => handleNavigation("/TaskInput")}
              sx={
                activeTab === "/TaskInput" ? { backgroundColor: "#e0caa9" } : {}
              }
            >
              <ListItemText primary="Add New Task" />
            </StyledListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
