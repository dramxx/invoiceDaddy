import React from "react";

import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const AddNewButton = ({ text, handleButtonClick }) => {
  return (
    <Button
      style={{ marginBottom: "25px" }}
      variant="contained"
      onClick={handleButtonClick}
      endIcon={<AddCircleIcon />}
    >
      {text}
    </Button>
  );
};

export default AddNewButton;
