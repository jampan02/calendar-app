import React, { useState, useEffect, FC } from "react";
import { Dispatch } from "redux";
import { DATE, DispatchByProps, StateByProps, TASK } from "../types/type";
import Header from "../components/sectionComponents/Header";
import { selectDate, setLastDate } from "../actions/dateAction";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AssignmentIcon from "@material-ui/icons/Assignment";
const useStyles = makeStyles((theme) => ({
  selectContainer: {
    backgroundColor: "darkgray",
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    backgroundColor: "darkgray",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
    display: "flex",
    cursor: "pointer",
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

interface PROPS extends DispatchByProps {
  date?: DATE;
  task?: TASK[];
}

const Select: FC<PROPS> = ({ selectDate, date, setLastDate, task }) => {
  const classes = useStyles();
  const [dateLength, selectDateLength] = useState<number[] | undefined>([]);
  //const [isExist, setIsExist] = useState(false);
  const history = useHistory();
  const getLastDay = (y: number, m: number) => {
    return new Date(y, m, 0).getDate();
  };
  useEffect(() => {
    if (date) {
      if (date.year === 0 || date.month === 0 || date.date === 0) {
        history.push("/");
      } else {
        const lastDay = getLastDay(date.year, date.month);
        if (setLastDate) {
          setLastDate(lastDay);
        }
        let newDays = [...Array(lastDay).keys()].map((i) => ++i);
        selectDateLength(newDays);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date?.month, history, setLastDate]);

  const onPageTransition = (d: number) => {
    if (selectDate) {
      selectDate(d);
      history.push("/");
    }
  };
  let isExist = false;
  return (
    <div>
      <Header />
      <div className={classes.selectContainer}>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {dateLength &&
              dateLength.map((d, i) => {
                isExist = false;

                return (
                  <Grid
                    item
                    key={i}
                    xs={6}
                    sm={4}
                    md={2}
                    onClick={() => onPageTransition(d)}
                  >
                    <Card className={classes.card}>
                      <CardContent className={classes.cardContent}>
                        <Typography>{d}日</Typography>
                        {date &&
                          task &&
                          // eslint-disable-next-line array-callback-return
                          task.map((t: TASK) => {
                            if (
                              date.year === t.date.year &&
                              date.month === t.date.month &&
                              d === t.date.date &&
                              !isExist
                            ) {
                              isExist = true;
                              return <AssignmentIcon />;
                            }
                          })}
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
        </Container>
      </div>
    </div>
  );
};

const mapStateToProps = (state: {
  date: DATE;
  task: TASK[];
}): StateByProps => ({
  date: state.date,
  task: state.task,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchByProps => ({
  selectDate: (date: number) => dispatch(selectDate(date)),
  setLastDate: (date: number) => dispatch(setLastDate(date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Select);
