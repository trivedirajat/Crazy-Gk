import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  Typography,
} from "@mui/material";

import ProfileImg from "../../assets/user-1.jpg";
import { jwtconfig } from "utils/Global";

const Profile = () => {
  const userData = JSON.parse(localStorage.getItem(jwtconfig.user) || "{}");
  const [anchorEl2, setAnchorEl2] = useState(null);

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="open profile menu"
        color="inherit"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleClick2}
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
      >
        <Avatar
          src={ProfileImg}
          alt="Profile"
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>

      <Menu
        id="profile-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "220px",
          },
        }}
      >
        <Box px={2} py={1} display="flex" flexDirection="column">
          <Typography variant="body1" fontWeight="bold" color="primary" sx={{mb:1}}>
            {userData.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {userData.email}
          </Typography>
        </Box>

        <Box mt={1} py={1} px={2}>
          <Button
            to="/auth/login"
            variant="outlined"
            color="primary"
            component={Link}
            fullWidth
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
