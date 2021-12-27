import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import toast from 'react-hot-toast';
import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import classes from "./Header.module.css";

import "./Header.css";
import { userContext } from "../../App";
import { FirebaseInitialize, SignOutUser } from "../Login/LoginManager";

// const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Header = () => {
  // const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [loggedInUser, setLoggedInUser] = useContext(userContext);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleLogOut = () => {
    FirebaseInitialize();
    SignOutUser()
    .then(res => {
      localStorage.removeItem("login");
      setLoggedInUser({});
      toast.success('Logged out successfully');
    })
  };



  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <div className="header-root">
      <div className="container">
        <div className="header">
          <Link to='/home' className="logo">
            <img src={require('../../logos/logo.png')} alt="Logo" />
          </Link>
          <div className="navbar">
            <div className="navigation">
              <NavLink
                to="/home"
                className={(navInfo) =>
                  navInfo.isActive ? classes.active : ""
                }
                id="link"
              >
                Home
              </NavLink>

              <NavLink
                to="/donation"
                className={(navInfo) =>
                  navInfo.isActive ? classes.active : ""
                }
                id="link"
              >
                Donation
              </NavLink>

              <NavLink
                to="/events"
                className={(navInfo) =>
                  navInfo.isActive ? classes.active : ""
                }
                id="link"
              >
                Events
              </NavLink>

              <NavLink
                to="/blog"
                className={(navInfo) =>
                  navInfo.isActive ? classes.active : ""
                }
                id="link"
              >
                Blog
              </NavLink>

              {
                !loggedInUser && (<Link id="link" to="/login" className="login">
                  Login
                </Link>)
              }
              <Link id="link" to="/admin" className="admin">
                Admin
              </Link>
            </div>
            {loggedInUser?.isSignIn && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src={
                        loggedInUser?.photo ||
                        "https://i.ibb.co/5GzXkwq/user.png"
                      }
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {/* {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))} */}
                  <MenuItem>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography textAlign="center">Account</Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography textAlign="center">Dashboard</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogOut}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
