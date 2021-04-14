import React from "react";
import { useHistory } from "react-router-dom";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { IconButton } from "@material-ui/core";

const SelectDay = () => {
  const history = useHistory();
  const pageNationtoSelect = () => {
    history.push("/select");
  };
  return (
    <IconButton onClick={pageNationtoSelect}>
      <CalendarTodayIcon />
    </IconButton>
  );
};

export default SelectDay;
