import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { Badge, Button, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { selectUserInfo } from '../../user/UserSlice';
import { selectCartItems } from '../../cart/CartSlice';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { selectWishlistItems } from '../../wishlist/WishlistSlice';
import { selectProductIsFilterOpen, toggleFilters } from '../../products/ProductSlice';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TuneIcon from '@mui/icons-material/Tune';

export const Navbar = ({ isProductList = false }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const userInfo = useSelector(selectUserInfo);
  const cartItems = useSelector(selectCartItems);
  const loggedInUser = useSelector(selectLoggedInUser);
  const wishlistItems = useSelector(selectWishlistItems);
  const isProductFilterOpen = useSelector(selectProductIsFilterOpen);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const is480 = useMediaQuery(theme.breakpoints.down(480));

  // 🚨 IMPORTANT FIX (prevents crash)
  if (!loggedInUser) return null;

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleToggleFilters = () => {
    dispatch(toggleFilters());
  };

  const settings = [
    { name: "Home", to: "/" },
    { name: "Profile", to: loggedInUser.isAdmin ? "/admin/profile" : "/profile" },
    { name: loggedInUser.isAdmin ? "Orders" : "My orders", to: loggedInUser.isAdmin ? "/admin/orders" : "/orders" },
    { name: "Logout", to: "/logout" }
  ];

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "white", boxShadow: "none", color: "text.primary" }}>
      <Toolbar sx={{ p: 1, height: "4rem", display: "flex", justifyContent: "space-around" }}>

        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          MERN SHOP
        </Typography>

        <Stack flexDirection="row" alignItems="center" columnGap={2}>

          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu}>
              <Avatar alt={userInfo?.name || "User"} />
            </IconButton>
          </Tooltip>

          <Menu
            sx={{ mt: '45px' }}
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {loggedInUser.isAdmin && (
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography component={Link} to="/admin/add-product">
                  Add new Product
                </Typography>
              </MenuItem>
            )}

            {settings.map((setting) => (
              <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                <Typography component={Link} to={setting.to}>
                  {setting.name}
                </Typography>
              </MenuItem>
            ))}
          </Menu>

          {userInfo?.name && (
            <Typography variant="h6" fontWeight={300}>
              {is480
                ? userInfo.name.split(" ")[0]
                : `Hey👋, ${userInfo.name}`}
            </Typography>
          )}

          {loggedInUser.isAdmin && (
            <Button variant="contained">Admin</Button>
          )}

          <Stack flexDirection="row" columnGap="1rem">

            {cartItems?.length > 0 && (
              <Badge badgeContent={cartItems.length} color="error">
                <IconButton onClick={() => navigate("/cart")}>
                  <ShoppingCartOutlinedIcon />
                </IconButton>
              </Badge>
            )}

            {!loggedInUser.isAdmin && (
              <Badge badgeContent={wishlistItems?.length} color="error">
                <IconButton component={Link} to="/wishlist">
                  <FavoriteBorderIcon />
                </IconButton>
              </Badge>
            )}

            {isProductList && (
              <IconButton onClick={handleToggleFilters}>
                <TuneIcon sx={{ color: isProductFilterOpen ? "black" : "" }} />
              </IconButton>
            )}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};