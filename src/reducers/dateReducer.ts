import {
  ADD_DATE,
  DECREMENT_DATE,
  DECREMENT_MONTH,
  INCREMENT_DATE,
  INCREMENT_MONTH,
  SET_DATE,
  SET_LAST_DATE,
  SET_HOURS_LENGTH,
  RESET_DATE,
  CHANGE_DATE,
} from "../actions/dateAction";
import { DATE } from "../types/type";
const thisYear = new Date().getFullYear();
const thisMonth = new Date().getMonth() + 1;
const today = new Date().getDate();

const initialState: DATE = {
  year: 0,
  month: 0,
  date: 0,
  lastDate: undefined,
  currentHourLength: undefined,
};

const getLastDay = (y: number, m: number) => {
  return new Date(y, m, 0).getDate();
};

const date = (
  state = initialState,
  action: {
    type: string;
    payload: { date: DATE; month?: number; day?: number };
  }
) => {
  switch (action.type) {
    case ADD_DATE:
      return {
        ...state,
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
      return {
        ...state,
        date: action.payload.date,
      };
    case SET_LAST_DATE:
      return {
        ...state,
        lastDate: action.payload.date,
      };
    case SET_HOURS_LENGTH:
      const currentHour = new Date().getHours();

      if (today === state.date) {
        const restOfLength = [...Array(25 - currentHour).keys()].map(
          (i) => i + currentHour
        );
        return {
          ...state,
          currentHourLength: restOfLength,
        };
      } else {
        return {
          ...state,
          currentHourLength: [
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
          ],
        };
      }
    case RESET_DATE:
      return {
        ...state,
        year: thisYear,
        month: thisMonth,
        date: today,
      };
    case CHANGE_DATE:
      return {
        ...state,
        month: action.payload.month,
        date: action.payload.day,
      };
    default:
      return state;
  }
};

export default date;
