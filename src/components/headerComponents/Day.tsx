import React, { FC } from "react";
import { connect } from "react-redux";
import { DATE, StateByProps } from "../../types/type";
import Typography from "@material-ui/core/Typography";
interface PROPS extends StateByProps {}

const Day: FC<PROPS> = ({ date }) => {
  return (
    <Typography>{`${date?.year}年${date?.month}月${date?.date}日`}</Typography>
  );
};

//空でも良いので、mapStateToPropsを記述
const mapStateToProps = (state: { date: DATE }): StateByProps => ({
  date: state.date,
});

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Day);
