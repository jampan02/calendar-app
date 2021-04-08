import React, { ReactElement, FC, useState, useEffect, useRef } from "react";
import { useScroll } from "../api/useScroll";
import Modal from "react-modal";
import { addTask } from "../actions/taskAction";
import { connect } from "react-redux";
import { DATE, DispatchByProps, TASK, StateByProps } from "../types/type";
import { Dispatch } from "redux";
import Task from "./Task";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

interface Column {
  id: "time" | "task";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "time", label: "時間", minWidth: 170 },
  { id: "task", label: "タスク", minWidth: 100 },
];

interface PROPS extends DispatchByProps {
  hour: number;
  date?: DATE;
  currentHour?: number;
  innerContentRef: any;
}
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const Section: FC<PROPS> = ({
  addTask,
  hour,
  date,
  currentHour,
  innerContentRef,
}) => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  const onAddTask = (e: any) => {
    e.preventDefault();
    if (!title) {
      alert("タイトルは必須です");
      return;
    }
    if (addTask) {
      if (date) {
        addTask({ title, memo, date, hour });
      }
    }
  };

  const row = {
    time: <div onClick={() => setIsOpen(true)}>{hour}時</div>,
    task: <Task hour={hour} />,
  };
  return (
    <>
      <TableRow hover role="checkbox" tabIndex={-1}>
        {columns.map((column) => {
          const value = row[column.id];
          return (
            <TableCell
              key={column.id}
              align={column.align}
              ref={innerContentRef}
            >
              {value}
            </TableCell>
          );
        })}
      </TableRow>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setIsOpen(false)}>
        <form onSubmit={(e) => onAddTask(e)}>
          作成画面
          <input
            type="text"
            placeholder="タイトル"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea onChange={(e) => setMemo(e.target.value)}></textarea>
          <input type="submit" />
        </form>
        <button onClick={() => setIsOpen(false)}>Close</button>
      </Modal>
    </>
  );
};

//空でも良いので、mapStateToPropsを記述
const mapStateToProps = (state: { date: DATE }): StateByProps => ({
  date: state.date,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchByProps => ({
  addTask: ({ title, memo, date, hour }: TASK) =>
    dispatch(addTask({ title, memo, date, hour })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Section);
