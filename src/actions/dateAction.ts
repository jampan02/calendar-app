import { DATE } from "../types/type";

export const ADD_DATE = "ADD_DATE";
export const INCREMENT_DATE = "INCREMENT_DATE";
export const DECREMENT_DATE = "DECREMENT_DATE";
export const INCREMENT_MONTH = "INCREMENT_MONTH";
export const DECREMENT_MONTH = "DECREMENT_MONTH";
export const SET_DATE = "SET_DATE";
export const SET_LAST_DATE = "SET_LAST_DATE";
export const SET_HOURS_LENGTH = "SET_HOURS_LENGTH";
export const RESET_DATE = "RESET_DATE";
export const CHANGE_DATE = "CHANGE_DATE";
export const addDate = (date: DATE) => {
  return {
    type: ADD_DATE,
    payload: { date },
  };
};

export const incrementDate = () => {
  return {
    type: INCREMENT_DATE,
  };
};

export const decrementDate = () => {
  return {
    type: DECREMENT_DATE,
  };
};

export const incrementMonth = () => {
  return {
    type: INCREMENT_MONTH,
  };
};

export const decrementMonth = () => {
  return {
    type: DECREMENT_MONTH,
  };
};

export const selectDate = (date: number) => {
  return {
    type: SET_DATE,
    payload: { date },
  };
};

export const setLastDate = (date: number) => {
  return {
    type: SET_LAST_DATE,
    payload: { date },
  };
};

export const setHoursLength = () => {
  return {
    type: SET_HOURS_LENGTH,
  };
};

export const resetDate = () => {
  return {
    type: RESET_DATE,
  };
};
export const changeDate = (month: number, day: number) => {
  return {
    type: CHANGE_DATE,
    payload: { month, day },
  };
};
