import React, { FC } from "react";
import { connect } from "react-redux";
import { DATE, DispatchByProps, TASK, StateByProps } from "../../types/type";

interface PROPS extends StateByProps {}

const Day: FC<PROPS> = ({ date }) => {
  return <div>{`${date?.year}年${date?.month}月${date?.date}日`}</div>;
};

//空でも良いので、mapStateToPropsを記述
const mapStateToProps = (state: { date: DATE }): StateByProps => ({
  date: state.date,
});

const mapDispatchToProps = (dispatch: any) => {};

export default connect(mapStateToProps, mapDispatchToProps)(Day);
