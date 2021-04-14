import React, { FC } from "react";
import NextMonth from "./sectionHeaderComponents/NextMonth";
import PrevMonth from "./sectionHeaderComponents/PrevMonth";
import { StateByProps } from "../../types/type";
import Day from "./sectionHeaderComponents/Day";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Home from "./sectionHeaderComponents/Home";
import Menu from "../Menu";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));
interface PROPS extends StateByProps {}

const Header: FC<PROPS> = ({ date }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Home />
        <PrevMonth />
        <NextMonth />
        <Typography>
          <Day />
        </Typography>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          カレンダー
        </Typography>
        <Menu />
      </Toolbar>
    </React.Fragment>
  );
};
export default Header;
