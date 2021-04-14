import React, { FC } from "react";
import { connect } from "react-redux";
import { DATE, StateByProps } from "../../../types/type";
import Typography from "@material-ui/core/Typography";
interface PROPS extends StateByProps {}

const Day: FC<PROPS> = ({ date }) => {
  return <Typography>{date && `${date.year}年${date.month}月`}</Typography>;
};

const mapStateToProps = (state: { date: DATE }): StateByProps => ({
  date: state.date,
});

const mapDispatchToProps = (dispatch: any) => {};

export default connect(mapStateToProps, mapDispatchToProps)(Day);
