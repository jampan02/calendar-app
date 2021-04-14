import React, { FC } from "react";
import { incrementDate } from "../../actions/dateAction";
import { connect } from "react-redux";
import { DispatchByProps } from "../../types/type";
import { Dispatch } from "redux";
import { IconButton } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
interface PROPS extends DispatchByProps {}

const NextDay: FC<PROPS> = ({ incrementDate }) => {
  return (
    <IconButton size="small" onClick={() => incrementDate && incrementDate()}>
      <ArrowForwardIosIcon />
    </IconButton>
  );
};

const mapStateToProps = (state: any) => {
  return {};
};
const mapDispatchToProps = (dispatch: Dispatch): DispatchByProps => ({
  incrementDate: () => dispatch(incrementDate()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NextDay);
