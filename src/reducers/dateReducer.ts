import {
  ADD_DATE,
  DECREMENT_DATE,
  DECREMENT_MONTH,
  INCREMENT_DATE,
  INCREMENT_MONTH,
  SET_DATE,
  SET_LAST_DATE,
} from "../actions/dateAction";
import { DATE } from "../types/type";

const initialState: DATE = {
  year: 0,
  month: 0,
  date: 0,
  lastDate: undefined,
};

const getLastDay = (y: number, m: number) => {
  return new Date(y, m, 0).getDate();
};

const date = (
  state = initialState,
  action: { type: string; payload: { date: DATE } }
) => {
  switch (action.type) {
    case ADD_DATE:
      return {
        year: action.payload.date.year,
        month: action.payload.date.month,
        date: action.payload.date.date,
      };
    case INCREMENT_DATE:
      if (state.lastDate === state.date) {
        const lastDay = getLastDay(state.year, state.month + 1);
        return {
          ...state,
          month: state.month + 1,
          date: 1,
          lastDate: lastDay,
        };
      }
      return {
        ...state,
        date: state.date + 1,
      };
    case DECREMENT_DATE:
      if (state.date === 1) {
        const lastDay = getLastDay(state.year, state.month - 1);
        return {
          ...state,
          month: state.month - 1,
          date: lastDay,
          lastDate: lastDay,
        };
      }
      return {
        ...state,
        date: state.date - 1,
      };
    case INCREMENT_MONTH:
      if (state.month === 12) {
        return {
          ...state,
          year: state.year + 1,
          month: 1,
        };
      }
      return {
        ...state,
        month: state.month + 1,
      };
    case DECREMENT_MONTH:
      if (state.month === 1) {
        return {
          ...state,
          year: state.year - 1,
          month: 12,
        };
      }
      return {
        ...state,
        month: state.month - 1,
      };
    case SET_DATE:
      console.log(state);
      return {
        ...state,
        date: action.payload.date,
      };
    case SET_LAST_DATE:
      return {
        ...state,
        lastDate: action.payload.date,
      };
    default:
      return state;
  }
};

export default date;
