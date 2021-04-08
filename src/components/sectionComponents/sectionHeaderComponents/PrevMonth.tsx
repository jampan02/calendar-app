import React, { FC } from "react";
import { decrementMonth } from "../../../actions/dateAction";
import { connect } from "react-redux";
import { DATE, DispatchByProps, TASK, StateByProps } from "../../../types/type";
import { Dispatch } from "redux";

interface PROPS extends DispatchByProps {}

const PrevMonth: FC<PROPS> = ({ decrementMonth }) => {
  return <div onClick={() => decrementMonth && decrementMonth()}>{`<`}</div>;
};

const mapStateToProps = (state: any) => {};

const mapDispatchToProps = (dispatch: Dispatch): DispatchByProps => ({
  decrementMonth: () => dispatch(decrementMonth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrevMonth);
