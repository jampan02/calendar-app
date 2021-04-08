import React, { ReactElement, FC, useState, useEffect, useRef } from "react";
import { useScroll } from "../api/useScroll";
import { Dispatch } from "redux";
import Section from "../components/Section";
import { DATE, DispatchByProps, StateByProps } from "../types/type";
import Header from "../components/Header";
import { addDate, setLastDate } from "../actions/dateAction";
import { connect } from "react-redux";
import Border from "../components/Border";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

interface Column {
  id: "time" | "task";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "time", label: "時間", minWidth: 170 },
  { id: "task", label: "タスク", minWidth: 100 },
];

interface PROPS extends DispatchByProps {
  date?: DATE;
}

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const App: FC<PROPS> = ({ addDate, date, setLastDate }) => {
  const innerContentRef = useRef<HTMLUListElement>(null);
  const outerContentRef = useRef<HTMLDivElement>(null);
  const classes = useStyles();
  const [currentHour, setCurrentHour] = useState<number | undefined>();
  const scroll = useScroll();
  useEffect(() => {
    scroll.setScrollPosition(scroll.getScrollWidth());
  }, [scroll]);

  const getLastDay = (y: number, m: number) => {
    return new Date(y, m, 0).getDate();
  };
  useEffect(() => {
    if (date) {
      if (date.year === 0 || date.month === 0 || date.date === 0) {
        const now = new Date();
        const Year = now.getFullYear();
        const Month = now.getMonth() + 1;
        const Today = now.getDate();
        const Hour = now.getHours();

        const todayEveryHour: DATE = {
          year: Year,
          month: Month,
          date: Today,
        };
        setCurrentHour(Hour);
        if (addDate) {
          addDate(todayEveryHour);
        }
        const lastDay = getLastDay(Year, Month);
        if (setLastDate) {
          setLastDate(lastDay);
        }
      } else {
        const lastDay = getLastDay(date.year, date.month);
        if (setLastDate) {
          setLastDate(lastDay);
        }
      }
    }
  }, []);
  const Allhours = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
  ];

  return (
    <Paper className={classes.root}>
      <Header />
      <TableContainer
        className={classes.container}
        ref={scroll.outerContentRef}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Allhours.map((hour, i) => {
              return (
                <Section
                  hour={hour}
                  key={i}
                  currentHour={currentHour}
                  innerContentRef={scroll.innerContentRef}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

const mapStateToProps = (state: { date: DATE }): StateByProps => ({
  date: state.date,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchByProps => ({
  addDate: (date: DATE) => dispatch(addDate(date)),
  setLastDate: (date: number) => dispatch(setLastDate(date)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
