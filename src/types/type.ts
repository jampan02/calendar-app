export type TASK = {
  title: string;
  memo: string;
  date: DATE;
  id: string;
  hour: number;
};

export type User = {
  uid?: string;
};

export type DATE = {
  year: number;
  month: number;
  date: number;
  lastDate?: number;
  currentHourLength?: number[] | undefined;
};

export type StateByProps = {
  task?: TASK[];
  date?: DATE;
  user?: User;
};

export type DispatchByProps = {
  addTask?: ({ title, memo, date, id }: TASK) => void;
  updateTask?: (title: string, memo: string, id: string) => void;
  deleteTask?: (id: string) => void;
  addDate?: (date: DATE) => void;
  incrementDate?: () => void;
  decrementDate?: () => void;
  incrementMonth?: () => void;
  decrementMonth?: () => void;
  selectDate?: (date: number) => void;
  setLastDate?: (date: number) => void;
  setHoursLength?: () => void;
  resetDate?: () => void;
  changeDate?: (month: number, day: number) => void;
  setUid?: (uid: string) => void;
  addAllTasks?: (allTasks: TASK[]) => void;
};
