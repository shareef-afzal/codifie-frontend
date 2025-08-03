import React, { useState,useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
  Box,
  Avatar,
  Tooltip,
  Container,
} from '@mui/material';
import './navbar.css';
import { useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const CustomNavbar = () => {
  const navigate=useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState({
    status:false,
    user:'',
  });
  let location=useLocation();
  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleLogout = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/logout`, {
        withCredentials: true,
      });

      if (res.status === 200) {
        setIsLoggedIn({ status: false, user: '' });
        navigate("/"); // or navigate("/users/login") if you prefer
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const goTo=(path)=>{
    navigate(path);
    handleCloseNavMenu();
    handleCloseUserMenu();
  }
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/isloggedin`, {
          withCredentials: true,
        });
        if(res.data?.isLoggedIn) {
          setIsLoggedIn({
            status:true,
            user:res.data.user,
          });
        } else {
          setIsLoggedIn({
            status:false,
            user:'',
          });
        }
      } catch (err) {
        setIsLoggedIn({
            status:false,
            user:'',
          });
      }
    };

    checkLoginStatus();
  }, [location]);


  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#131825' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* Left: Logo */}
          <Typography
            variant="h4"
            component="div"
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 2, cursor: 'pointer' }}
            color="#36E0FF"
            fontWeight="bold"
            onClick={()=>goTo("/")}
            
          >
            CODIFIE
          </Typography>

          {/* Mobile menu icon */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="open navigation"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {!isLoggedIn.status && <MenuItem onClick={()=>goTo('/users/signup')}>
                <Typography textAlign="center">Sign Up</Typography>
              </MenuItem>}
              {!isLoggedIn.status && <MenuItem onClick={()=>goTo('/users/login')}>
                <Typography textAlign="center">Login</Typography>
              </MenuItem>}
              <MenuItem onClick={()=>goTo('/users/search')}>
                <Typography textAlign="center">Search</Typography>
              </MenuItem>
              {isLoggedIn.status && <MenuItem onClick={()=>goTo(`/users/${isLoggedIn.user.username}/friends`)}>
                <Typography textAlign="center">My Friends</Typography>
              </MenuItem>}
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', cursor: 'pointer' } }}
            color="#36E0FF"
            fontWeight="bold"
            onClick={()=>goTo("/")}
          >
            CODIFIE
          </Typography>

          {/* Spacer to push pages & avatar to right */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />

          {/* Pages aligned to right (desktop only) */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
            {!isLoggedIn.status && <Button sx={{ color: 'white' }} onClick={()=>goTo('/users/signup')}>
              Sign Up
            </Button>
            }
            {!isLoggedIn.status && <Button sx={{ color: 'white' }} onClick={()=>goTo('/users/login')}>
              Login
            </Button>
            }
            <Button sx={{ color: 'white' }} onClick={()=>goTo('/users/search')}>
              Search
            </Button>
            {
              isLoggedIn.status && <Button sx={{ color: 'white' }} onClick={()=>goTo(`/users/${isLoggedIn.user.username}/friends`)}>
              My Friends
            </Button>
            }
          </Box>

          {/* Profile Avatar */}
          {isLoggedIn.status && <Box sx={{ flexGrow: 0, ml: 2 }}>
            <Tooltip title="Account settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar>
                  <AccountCircle />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              sx={{ mt: '40px' }}
            >
              <MenuItem onClick={() => goTo(`/users/${isLoggedIn.user.username}`)}>
                <Typography textAlign="center">My Profile</Typography>
              </MenuItem>
              <MenuItem onClick={() => goTo(`/users/${isLoggedIn.user.username}/edit`)}>
                <Typography textAlign="center">Edit Profile</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default CustomNavbar;
