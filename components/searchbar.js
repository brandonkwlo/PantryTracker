import React, { useState } from "react";
import { TextField } from "@mui/material";

const SearchBar = ({ placeholder = "Search...", onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    if (onSearch) {
      onSearch(newSearchTerm);
    }
  };

  return (
    <TextField
      fullWidth
      placeholder={placeholder}
      size="medium"
      id="search-bar"
      label="Search"
      variant="outlined"
      value={searchTerm}
      onChange={handleChange}
    />
  );
};

export default SearchBar;
