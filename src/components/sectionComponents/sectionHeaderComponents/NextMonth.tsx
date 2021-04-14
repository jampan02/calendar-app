import React, { FC } from "react";
import { incrementMonth } from "../../../actions/dateAction";
import { connect } from "react-redux";
import { DispatchByProps } from "../../../types/type";
import { Dispatch } from "redux";
import { IconButton } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
interface PROPS extends DispatchByProps {}

const NextMonth: FC<PROPS> = ({ incrementMonth }) => {
  return (
    <IconButton size="small" onClick={() => incrementMonth && incrementMonth()}>
      <ArrowForwardIosIcon />
    </IconButton>
  );
};
const mapStateToProps = (state: any) => {
  return {};
};
const mapDispatchToProps = (dispatch: Dispatch): DispatchByProps => ({
  incrementMonth: () => dispatch(incrementMonth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NextMonth);
