import React, { FC } from "react";
import NextMonth from "./sectionHeaderComponents/NextMonth";
import PrevMonth from "./sectionHeaderComponents/PrevMonth";
import { incrementDate } from "../../actions/dateAction";
import { connect } from "react-redux";
import { DATE, DispatchByProps, TASK, StateByProps } from "../../types/type";
import { Dispatch } from "redux";
import Day from "./sectionHeaderComponents/Day";

interface PROPS extends StateByProps {}

const Header: FC<PROPS> = ({ date }) => {
  return (
    <div>
      <Day />
      <NextMonth />
      <PrevMonth />
    </div>
  );
};
export default Header;
