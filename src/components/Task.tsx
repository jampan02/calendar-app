import React, { useState, FC } from "react";
import { connect } from "react-redux";
import { StateByProps, TASK, DispatchByProps, DATE } from "../types/type";
import Modal from "react-modal";
import { Dispatch } from "redux";
import { deleteTask, updateTask } from "../actions/taskAction";

interface PROPS extends DispatchByProps {
  hour: number;
  task?: TASK[];
  date?: DATE;
}

const Task: FC<PROPS> = ({ task, hour, updateTask, deleteTask, date }) => {
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");
  const [willUpdateId, setWillUpdateId] = useState<undefined | number>(
    undefined
  );
  const [modalIsOpen, setIsOpen] = useState(false);
  const onUpdateTask = (e: any) => {
    e.preventDefault();
    if (willUpdateId) {
      const id = willUpdateId;
      if (updateTask) {
        updateTask(title, memo, id);
      }
    }
  };
  const onDeleteTask = () => {
    if (willUpdateId) {
      const id = willUpdateId;
      if (deleteTask) {
        deleteTask(id);
      }
    }
  };
  const onOpenModal = (openedTask: TASK) => {
    setIsOpen(true);
    setWillUpdateId(openedTask.id);
    setTitle(openedTask.title);
    setMemo(openedTask.memo);
  };
  return (
    <div>
      {task &&
        task.map((t) => {
          if (date) {
            const thisDate: DATE = date;

            const connectedDateA =
              "" + thisDate.year + thisDate.month + thisDate.date + hour;
            const connectedDateB =
              "" + t.date.year + t.date.month + t.date.date + t.hour;
            if (connectedDateA === connectedDateB) {
              return (
                <>
                  <span
                    onClick={() => {
                      onOpenModal(t);
                    }}
                  >
                    {t.title}
                  </span>
                  <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setIsOpen(false)}
                  >
                    <form onSubmit={(e) => onUpdateTask(e)}>
                      更新画面
                      <input
                        value={title}
                        type="text"
                        placeholder="タイトル"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <textarea
                        value={memo}
                        onChange={(e) => setMemo(e.target.value)}
                      ></textarea>
                      <input type="submit" />
                    </form>
                    <button onClick={() => onDeleteTask()}>削除</button>
                    <button onClick={() => setIsOpen(false)}>Close</button>
                  </Modal>
                </>
              );
            }
          }
        })}
    </div>
  );
};

const mapStateToProps = (state: {
  task: TASK[];
  date: DATE;
}): StateByProps => ({
  task: state.task,
  date: state.date,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchByProps => ({
  updateTask: (title: string, memo: string, id: number) =>
    dispatch(updateTask(title, memo, id)),
  deleteTask: (id: number) => dispatch(deleteTask(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Task);
