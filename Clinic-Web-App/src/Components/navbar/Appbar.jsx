import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Avatar,
  Badge,
  MenuItem,
  Menu,
  Button,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import FaceUser from "../../assests/image/avatar/user.png";
import { Notification, Moon } from "../../assests/image/svg";
import DrawerActionButton from "./drawerActionButton";
import { useContext } from "react";
import MainContext from "../../context/index";
import { Link } from "react-router-dom";

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={handleMenuClose}
        sx={{ pr: 4, fontFamily: "YekanBakh", fontSize: "0.9rem" }}
      >
        پروفایل
      </MenuItem>
      <MenuItem
        onClick={handleMenuClose}
        sx={{ pr: 4, fontFamily: "YekanBakh", fontSize: "0.9rem" }}
      >
        اکانت من
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/*
  <MenuItem>
        <IconButton size="medium" aria-label="show 4 new mails" color="inherit">
          <Box component="img" src={Moon} />
        </IconButton>
        <p>تم</p>
      </MenuItem>
  */}
      <Link to="/login">
        <MenuItem>
          <p>ورود</p>
        </MenuItem>
      </Link>
      <Link to="/profile">
        <MenuItem>
          <p>پروفایل</p>
        </MenuItem>
      </Link>
    </Menu>
  );
  const handleToggleMode = useContext(MainContext).handleToggleMode;
  const { setDrawerOpen } = useContext(MainContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ background: "none", boxShadow: "none", color: "#000" }}
      >
        <Toolbar>
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => setDrawerOpen(true)}
            sx={{
              mr: 2,
              display: {
                xs: "inline-block",
                sm: "inline-block",
                md: "none",
                lg: "none",
                xl: "none",
              },
            }}
          >
            <DrawerActionButton />
          </IconButton>
          {/*
         <Searchs>
            <SearchIconWrapper>
              <Box component="img" src={SearchIcon} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="جست و جو"
              inputProps={{ "aria-label": "search" }}
            />
          </Searchs>
        */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {/*
             <IconButton
              size="medium"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={handleToggleMode}
            >
              <Box component="img" src={Moon} />
            </IconButton>
            <IconButton
              size="medium"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <Box component="img" src={Notification} />
              </Badge>
            </IconButton>
        */}
            <Link to="/login">
              <Button variant="outlined">ورود</Button>
            </Link>
            <Link to="profile">
              <IconButton
                size="medium"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar src={FaceUser} sx={{ width: 26, height: 26 }} />
              </IconButton>
            </Link>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="medium"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreVert />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {/* {renderMenu} */}
    </Box>
  );
}
