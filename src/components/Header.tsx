import React from "react";
import Day from "./headerComponents/Day";
import NextDay from "./headerComponents/NextDay";
import PrevDay from "./headerComponents/PrevDay";
import SelectDay from "./headerComponents/SelectDay";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Menu from "./Menu";
import CssBaseline from "@material-ui/core/CssBaseline";
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

const Header = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <Toolbar className={classes.toolbar}>
        <SelectDay />
        <PrevDay />
        <NextDay />
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
