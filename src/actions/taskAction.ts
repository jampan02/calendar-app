import { TASK } from "../types/type";

export const ADD_TASK = "ADD_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const ADD_ALL_TASKS = "ADD_ALL_TASKS";

export const addTask = ({ title, memo, date, id, hour }: TASK) => {
  return {
    type: ADD_TASK,
    payload: { title, memo, date, id, hour },
  };
};

export const updateTask = (title: string, memo: string, id: string) => {
  return {
    type: UPDATE_TASK,
    payload: { title, memo, id },
  };
};

export const deleteTask = (id: string) => {
  return {
    type: DELETE_TASK,
    payload: { id },
  };
};

export const addAllTasks = (allTasks: TASK[]) => {
  return {
    type: ADD_ALL_TASKS,
    payload: { allTasks },
  };
};
