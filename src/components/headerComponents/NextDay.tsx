import React, { FC } from "react";
import { incrementDate } from "../../actions/dateAction";
import { connect } from "react-redux";
import { DATE, DispatchByProps, TASK, StateByProps } from "../../types/type";
import { Dispatch } from "redux";
interface PROPS extends DispatchByProps {}

const NextDay: FC<PROPS> = ({ incrementDate }) => {
  return (
    <div>
      inc
      <span onClick={() => incrementDate && incrementDate()}>{">"}</span>
    </div>
  );
};

const mapStateToProps = (state: any) => {};

const mapDispatchToProps = (dispatch: Dispatch): DispatchByProps => ({
  incrementDate: () => dispatch(incrementDate()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NextDay);
