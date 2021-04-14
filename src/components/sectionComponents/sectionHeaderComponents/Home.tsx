import React, { FC } from "react";
import HomeIcon from "@material-ui/icons/Home";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { resetDate } from "../../../actions/dateAction";
import { connect } from "react-redux";
import { DispatchByProps } from "../../../types/type";
import { Dispatch } from "redux";
interface PROPS extends DispatchByProps {}
const Home: FC<PROPS> = ({ resetDate }) => {
  const history = useHistory();
  const pageNationtoHome = () => {
    if (resetDate) resetDate();

    history.push("/");
  };
  return (
    <IconButton onClick={pageNationtoHome}>
      <HomeIcon />
    </IconButton>
  );
};

const mapStateToProps = (state: any) => {};

const mapDispatchToProps = (dispatch: Dispatch): DispatchByProps => ({
  resetDate: () => dispatch(resetDate()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
