import React, { useState } from "react";
import SortIcon from "@mui/icons-material/Sort";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const SortButton = ({ onSort }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSort = (sortType) => {
    onSort(sortType);
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <SortIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleSort("a-z")}>A-Z</MenuItem>
        <MenuItem onClick={() => handleSort("z-a")}>Z-A</MenuItem>
        <MenuItem onClick={() => handleSort("most")}>Most Quantity</MenuItem>
      </Menu>
    </>
  );
};

export default SortButton;
