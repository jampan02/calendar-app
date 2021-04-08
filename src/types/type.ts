export type TASK = {
  title: string;
  memo: string;
  date: DATE;
  id?: number;
  hour?: number;
};

export type DATE = {
  year: number;
  month: number;
  date: number;
  lastDate?: number;
};

export type StateByProps = {
  task?: TASK[];
  date?: DATE;
};

export type DispatchByProps = {
  addTask?: ({ title, memo, date, id }: TASK) => void;
  updateTask?: (title: string, memo: string, id: number) => void;
  deleteTask?: (id: number) => void;
  addDate?: (date: DATE) => void;
  incrementDate?: () => void;
  decrementDate?: () => void;
  incrementMonth?: () => void;
  decrementMonth?: () => void;
  selectDate?: (date: number) => void;
  setLastDate?: (date: number) => void;
};
