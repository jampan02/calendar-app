import { connect } from "react-redux";
import { DispatchByProps, TASK, StateByProps } from "../types/type";
import { Dispatch } from "redux";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import React, { FC, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { changeDate } from "../actions/dateAction";
import { Typography } from "@material-ui/core";
import firebase from "../plugins/firebase";
const now = new Date();
const useStyles = makeStyles((theme) => ({
  drawer: {
    overflowY: "visible",
  },
  list: {
    width: "200px",
  },
  taskContainer: {
    position: "relative",
    cursor: "pointer",
  },
  date: {
    position: "absolute",
    right: "10px",
  },
  text: {
    maxWidth: "100px",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  menu: {
    display: "flex",
    alignItems: "center",
  },
  menuTypo: {
    margin: "auto",
  },
  menuIcon: {
    // minWidth: "56px",
  },
  button: {
    textAlign: "center",
    margin: "auto",
  },
}));

interface PROPS extends StateByProps {
  changeDate?: (month: number, day: number) => void;
}

const Menu: FC<PROPS> = ({ task, changeDate }) => {
  useEffect(() => {
    if (task) {
      const nT = task;

      nT.sort(function (a: TASK, b: TASK) {
        if (a.date.date < b.date.date) return -1;
        if (a.date.date > b.date.date) return 1;
        return 0;
      });
      nT.sort(function (a: TASK, b: TASK) {
        if (a.date.month < b.date.month) return -1;
        if (a.date.month > b.date.month) return 1;
        return 0;
      });
      setSortedTask(nT);
    }
  }, [task]);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [sortedTask, setSortedTask] = useState<TASK[]>([]);
  const [isTaskOpen, setIsTaskOpen] = React.useState(false);
  const [isUserOpen, setIsUserOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const onShowOrHideTasks = () => {
    setIsTaskOpen(!isTaskOpen);
  };
  const onShowOrHideUsers = () => {
    setIsUserOpen(!isUserOpen);
  };
  const onChangeDate = (month: number, date: number) => {
    changeDate && changeDate(month, date);
  };
  const logout = () => {
    firebase.auth().signOut();
  };
  return (
    <>
      <IconButton onClick={handleDrawerOpen}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor={"right"} open={open} classes={{ paper: classes.drawer }}>
        <div className={classes.menu}>
          <IconButton
            onClick={handleDrawerClose}
            classes={{ label: classes.menuIcon }}
          >
            <ChevronRightIcon />
          </IconButton>
          <Typography className={classes.menuTypo}>メニュー</Typography>
        </div>
        <Divider />

        <List className={classes.list}>
          <ListItem button onClick={onShowOrHideTasks}>
            <ListItemIcon>
              {isTaskOpen ? (
                <KeyboardArrowDownIcon />
              ) : (
                <KeyboardArrowRightIcon />
              )}
            </ListItemIcon>
            <ListItemText primary="タスク一覧" />
          </ListItem>
          <Collapse in={isTaskOpen} timeout="auto" unmountOnExit>
            <div>
              <List>
                {sortedTask &&
                  // eslint-disable-next-line array-callback-return
                  sortedTask.map((t, i) => {
                    let tasksHour;
                    if (t.hour < 10) {
                      tasksHour = ("00" + t.hour + 1).slice(-2);
                    } else {
                      tasksHour = String(t.hour + 1);
                    }
                    if (
                      now <=
                      new Date(
                        `${t.date.year}/${t.date.month}/${t.date.date} ${tasksHour}:00`
                      )
                    ) {
                      return (
                        <ListItem
                          button
                          key={i}
                          className={classes.taskContainer}
                          onClick={() =>
                            onChangeDate(t.date.month, t.date.date)
                          }
                        >
                          <ListItemText
                            primary={t.title}
                            classes={{ primary: classes.text }}
                          />
                          <ListItemText
                            className={classes.date}
                            primary={`${t.date.month}/${t.date.date}`}
                          />
                        </ListItem>
                      );
                    }
                  })}
              </List>
            </div>
          </Collapse>
          <ListItem button onClick={onShowOrHideUsers}>
            <ListItemIcon>
              {isUserOpen ? (
                <KeyboardArrowDownIcon />
              ) : (
                <KeyboardArrowRightIcon />
              )}
            </ListItemIcon>
            <ListItemText primary="ユーザー" />
          </ListItem>
          <Collapse in={isUserOpen} timeout="auto" unmountOnExit>
            <div>
              <List>
                <ListItem>
                  <Button variant="outlined" color="secondary" onClick={logout}>
                    ログアウト
                  </Button>
                </ListItem>
              </List>
            </div>
          </Collapse>
        </List>
      </Drawer>
    </>
  );
};

const mapStateToProps = (state: { task: TASK[] }): StateByProps => ({
  task: state.task,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchByProps => ({
  changeDate: (month: number, day: number) => dispatch(changeDate(month, day)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Menu);
