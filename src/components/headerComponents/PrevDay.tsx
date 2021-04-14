import React, { FC } from "react";
import { decrementDate } from "../../actions/dateAction";
import { connect } from "react-redux";
import { DispatchByProps } from "../../types/type";
import { Dispatch } from "redux";
import { IconButton } from "@material-ui/core";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
interface PROPS extends DispatchByProps {}

const PrevDay: FC<PROPS> = ({ decrementDate }) => {
  return (
    <IconButton size="small" onClick={() => decrementDate && decrementDate()}>
      <ArrowBackIosIcon />
    </IconButton>
  );
};

const mapStateToProps = (state: any) => {
  return {};
};
const mapDispatchToProps = (dispatch: Dispatch): DispatchByProps => ({
  decrementDate: () => dispatch(decrementDate()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrevDay);
