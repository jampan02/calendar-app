import React, { FC } from "react";
import { incrementDate, incrementMonth } from "../../../actions/dateAction";
import { connect } from "react-redux";
import { DATE, DispatchByProps, TASK, StateByProps } from "../../../types/type";
import { Dispatch } from "redux";

interface PROPS extends DispatchByProps {}

const NextMonth: FC<PROPS> = ({ incrementMonth }) => {
  return <div onClick={()=>incrementMonth && incrementMonth()}>{">"}</div>;
};
const mapStateToProps = (state: any) => {};

const mapDispatchToProps = (dispatch: Dispatch): DispatchByProps => ({
  incrementMonth: () => dispatch(incrementMonth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NextMonth);
