import { useState } from "react";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProfileAvatar = ({ name }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const initials = name
    ? name
        .split(" ")
        .slice(0, 2)
        .map((n) => n.charAt(0))
        .join("")
        .toUpperCase()
    : "";

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleNavigate = (path) => {
    navigate(path);
    handleClose();
  };

  return (
    <>
      <Avatar sx={{ bgcolor: "blue", cursor: "pointer" }} onClick={handleClick}>
        {initials.toUpperCase()}
      </Avatar>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => handleNavigate("/profile")}>
          View Profile
        </MenuItem>
        <MenuItem onClick={() => handleNavigate("/settings")}>
          Settings
        </MenuItem>
        <MenuItem onClick={() => handleNavigate("/logout")}>Log Out</MenuItem>
      </Menu>
    </>
  );
};

export default ProfileAvatar;
