import React, { FC } from "react";
import { decrementMonth } from "../../../actions/dateAction";
import { connect } from "react-redux";
import { DispatchByProps } from "../../../types/type";
import { Dispatch } from "redux";
import { IconButton } from "@material-ui/core";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
interface PROPS extends DispatchByProps {}

const PrevMonth: FC<PROPS> = ({ decrementMonth }) => {
  return (
    <IconButton size="small" onClick={() => decrementMonth && decrementMonth()}>
      <ArrowBackIosIcon />
    </IconButton>
  );
};

const mapStateToProps = (state: any) => {
  return {};
};
const mapDispatchToProps = (dispatch: Dispatch): DispatchByProps => ({
  decrementMonth: () => dispatch(decrementMonth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrevMonth);
