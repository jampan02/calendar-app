import { TASK } from "../types/type";

export const ADD_TASK = "ADD_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const GET_ALL_TASK = "GET_ALL_TASK";
let id = 0;
export const addTask = ({ title, memo, date, hour }: TASK) => {
  id++;
  return {
    type: ADD_TASK,
    payload: { title, memo, date, id, hour },
  };
};

export const updateTask = (title: string, memo: string, id: number) => {
  return {
    type: UPDATE_TASK,
    payload: { title, memo, id },
  };
};

export const deleteTask = (id: number) => {
  return {
    type: DELETE_TASK,
    payload: { id },
  };
};
