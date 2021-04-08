import React from "react";
import Day from "./headerComponents/Day";
import NextDay from "./headerComponents/NextDay";
import PrevDay from "./headerComponents/PrevDay";
import SelectDay from "./headerComponents/SelectDay";

const Header = () => {
  return (
    <div>
      <SelectDay />
      <PrevDay />
      <Day />
      <NextDay />
    </div>
  );
};

export default Header;
