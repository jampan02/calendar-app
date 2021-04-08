import React, { FC } from "react";
import { incrementDate, decrementDate } from "../../actions/dateAction";
import { connect } from "react-redux";
import { DATE, DispatchByProps, TASK, StateByProps } from "../../types/type";
import { Dispatch } from "redux";
interface PROPS extends DispatchByProps {}

const PrevDay: FC<PROPS> = ({ decrementDate }) => {
  return (
    <div>
      <span onClick={() => decrementDate && decrementDate()}>{">"}</span>
    </div>
  );
};

const mapStateToProps = (state: any) => {};

const mapDispatchToProps = (dispatch: Dispatch): DispatchByProps => ({
  decrementDate: () => dispatch(decrementDate()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrevDay);
