import React, { useState, useEffect, FC } from "react";
import { Dispatch } from "redux";
import Section from "../components/Section";
import { DATE, DispatchByProps, StateByProps } from "../types/type";
import Header from "../components/sectionComponents/Header";
import { addDate, selectDate, setLastDate } from "../actions/dateAction";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
//import { getNationalHolidays } from "../api/api";

interface PROPS extends DispatchByProps {
  date?: DATE;
}

const Select: FC<PROPS> = ({ selectDate, date, setLastDate }) => {
  const [dateLength, selectDateLength] = useState<number[] | undefined>([]);
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
  }, [date?.month, history, setLastDate]);

  const onPageTransition = (d: number) => {
    if (selectDate) {
      selectDate(d);
      history.push("/");
    }
  };
  return (
    <div>
      <Header />
      <div>
        {dateLength &&
          dateLength.map((d) => (
            <div onClick={() => onPageTransition(d)}>
              <a>{`${d}日`}</a>
            </div>
          ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state: { date: DATE }): StateByProps => ({
  date: state.date,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchByProps => ({
  selectDate: (date: number) => dispatch(selectDate(date)),
  setLastDate: (date: number) => dispatch(setLastDate(date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Select);
