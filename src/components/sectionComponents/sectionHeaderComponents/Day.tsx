import React, { FC } from "react";
import { incrementDate } from "../../../actions/dateAction";
import { connect } from "react-redux";
import { DATE, DispatchByProps, TASK, StateByProps } from "../../../types/type";
import { Dispatch } from "redux";

interface PROPS extends StateByProps {}

const Day: FC<PROPS> = ({ date }) => {
  return (
    <div>
      {date && <h1>{`${date.year}年${date.month}月${date.date}日`}</h1>}
    </div>
  );
};

const mapStateToProps = (state: { date: DATE }): StateByProps => ({
  date: state.date,
});

const mapDispatchToProps = (dispatch: any) => {};

export default connect(mapStateToProps, mapDispatchToProps)(Day);
