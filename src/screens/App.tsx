import React, { FC, useState, useEffect } from "react";
import { Dispatch } from "redux";
import Section from "../components/Section";
import { DATE, DispatchByProps, StateByProps, TASK } from "../types/type";
import Header from "../components/Header";
import { addDate, setLastDate, setHoursLength } from "../actions/dateAction";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import firebase from "../plugins/firebase";
import { useHistory } from "react-router-dom";
import { setUid } from "../actions/userAction";
import { getAllTasks } from "../api/api";
import { addAllTasks } from "../actions/taskAction";

interface PROPS extends DispatchByProps {
  date?: DATE;
}

const useStyles = makeStyles((theme) => ({
  container: {
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
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 0,
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
    // textAlign: "center",
    display: "flex",
    padding: 0,
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  currentCardContent: {
    flexGrow: 1,
    // textAlign: "center",
    backgroundColor: "coral",
    display: "flex",
    padding: 0,
    "&:last-child": {
      paddingBottom: 0,
    },
  },
}));

const App: FC<PROPS> = ({
  addDate,
  date,
  setLastDate,
  setHoursLength,
  setUid,
  addAllTasks,
}) => {
  const history = useHistory();
  const classes = useStyles();
  const [today, setToday] = useState<number | undefined>();
  const [currentHour, setCurrentHour] = useState<number | undefined>();
  const getLastDay = (y: number, m: number) => {
    return new Date(y, m, 0).getDate();
  };
  useEffect(() => {
    setCurrentHour(new Date().getHours());
    setToday(new Date().getDate());
    if (setHoursLength) {
      setHoursLength();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date && date.date, date && date.month]);
  useEffect(() => {
    const f = () => {
      firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {
          var userId = firebase.auth().currentUser;

          if (userId) {
            // User is signed in.
            const uid = userId.uid;

            setUid && setUid(uid);

            const allTasks = await getAllTasks(uid);
            addAllTasks && addAllTasks(allTasks);

            if (date) {
              if (date.year === 0 || date.month === 0 || date.date === 0) {
                const now = new Date();
                const Year = now.getFullYear();
                const Month = now.getMonth() + 1;
                const Today = now.getDate();
                setCurrentHour(now.getHours());
                setToday(Today);
                const todayEveryHour: DATE = {
                  year: Year,
                  month: Month,
                  date: Today,
                };

                if (addDate) {
                  addDate(todayEveryHour);
                }
                const lastDay = getLastDay(Year, Month);
                if (setLastDate) {
                  setLastDate(lastDay);
                }
                if (setHoursLength) {
                  setHoursLength();
                }
              } else {
                if (setHoursLength) {
                  setHoursLength();
                }
                const lastDay = getLastDay(date.year, date.month);
                if (setLastDate) {
                  setLastDate(lastDay);
                }
              }
            }
          } else {
            // No user is signed in.
          }
        } else {
          //not login
          history.push("/login");
        }
      });
    };
    f();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <div className={classes.container}>
        <Container className={classes.cardGrid} maxWidth="sm">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {date &&
              date.currentHourLength &&
              date.currentHourLength.map((hour, i) => {
                return (
                  <Grid item key={i} xs={12}>
                    <Card className={classes.card}>
                      {currentHour && date && hour === currentHour ? (
                        date.date === today ? (
                          <>
                            <CardContent className={classes.currentCardContent}>
                              <Section hour={hour} key={i} />
                            </CardContent>
                          </>
                        ) : (
                          <CardContent className={classes.cardContent}>
                            <Section
                              hour={hour}
                              key={i}
                              currentHour={currentHour}
                            />
                          </CardContent>
                        )
                      ) : (
                        <CardContent className={classes.cardContent}>
                          <Section
                            hour={hour}
                            key={i}
                            currentHour={currentHour}
                          />
                        </CardContent>
                      )}
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
        </Container>
      </div>
    </>
  );
};

const mapStateToProps = (state: { date: DATE }): StateByProps => ({
  date: state.date,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchByProps => ({
  addDate: (date: DATE) => dispatch(addDate(date)),
  setLastDate: (date: number) => dispatch(setLastDate(date)),
  setHoursLength: () => dispatch(setHoursLength()),
  setUid: (uid: string) => dispatch(setUid(uid)),
  addAllTasks: (allTasks: TASK[]) => dispatch(addAllTasks(allTasks)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
