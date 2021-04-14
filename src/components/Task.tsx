import React, { useState, FC } from "react";
import { connect } from "react-redux";
import { StateByProps, TASK, DispatchByProps, DATE, User } from "../types/type";
import Modal from "react-modal";
import { Dispatch } from "redux";
import { deleteTask, updateTask } from "../actions/taskAction";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { Button, IconButton, TextField, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { onDelete, onUpdate } from "../api/api";
import MediaQuery from "react-responsive";
interface PROPS extends DispatchByProps {
  hour: number;
  task?: TASK[];
  date?: DATE;
  user?: User;
}

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  isNone: {
    display: "none",
  },
  task: {
    display: "flex",
    backgroundColor: "#1e90ff",
    //borderRadius: 0,
    alignItems: "center",
    // marginLeft: "10px",
    flexGrow: 1,
    cursor: "pointer",
  },
  cardContent: {
    flexGrow: 1,
    // textAlign: "center",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    display: "flex",
    padding: "10px",
    "&:last-child": {
      paddingBottom: "10px",
    },

    color: "white",
  },
  typo: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  text: {
    marginTop: "20px",
  },
  closeIcon: {
    position: "absolute",
    top: "5px",
    right: "5px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
});

const Task: FC<PROPS> = ({
  task,
  hour,
  updateTask,
  deleteTask,
  date,
  user,
}) => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");
  const [willUpdateId, setWillUpdateId] = useState<undefined | string>(
    undefined
  );
  const [modalIsOpen, setIsOpen] = useState(false);
  const onUpdateTask = (e: any) => {
    e.preventDefault();
    if (willUpdateId) {
      const id = willUpdateId;
      if (title) {
        if (updateTask) {
          if (user && user.uid) {
            onUpdate(user.uid, id, title, memo);
            updateTask(title, memo, id);
            setIsOpen(false);
          }
        }
      } else {
        alert("タイトルは必須です");
      }
    }
  };
  const onDeleteTask = () => {
    if (willUpdateId) {
      const id = willUpdateId;
      if (deleteTask) {
        user && user.uid && onDelete(user.uid, id);
        deleteTask(id);
      }
      setIsOpen(false);
    }
  };
  const onOpenModal = (openedTask: TASK) => {
    setIsOpen(true);
    setWillUpdateId(openedTask.id);
    setTitle(openedTask.title);
    setMemo(openedTask.memo);
  };
  return (
    <>
      {task &&
        // eslint-disable-next-line array-callback-return
        task.map((t, i) => {
          if (date) {
            const thisDate: DATE = date;

            const connectedDateA =
              "" + thisDate.year + thisDate.month + thisDate.date + hour;
            const connectedDateB =
              "" + t.date.year + t.date.month + t.date.date + t.hour;
            if (connectedDateA === connectedDateB) {
              return (
                <Card className={classes.task} key={i}>
                  <CardContent
                    className={classes.cardContent}
                    onClick={() => {
                      onOpenModal(t);
                    }}
                  >
                    <Typography className={classes.typo}>{t.title}</Typography>
                  </CardContent>
                  <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setIsOpen(false)}
                    style={customStyles as Modal.Styles}
                    ariaHideApp={false}
                  >
                    <IconButton
                      onClick={() => setIsOpen(false)}
                      className={classes.closeIcon}
                    >
                      <CloseIcon />
                    </IconButton>
                    <div className={classes.textContainer}>
                      <TextField
                        defaultValue={title}
                        id="standard-basic"
                        label="タイトル"
                        onChange={(e) => setTitle(e.target.value)}
                        className={classes.text}
                      />
                      <TextField
                        defaultValue={memo}
                        id="filled-multiline-static"
                        label="メモ"
                        multiline
                        rows={4}
                        variant="filled"
                        className={classes.text}
                        onChange={(e) => setMemo(e.target.value)}
                      />
                    </div>
                    <div className={classes.buttonContainer}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={onUpdateTask}
                        className={classes.text}
                      >
                        更新
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={onDeleteTask}
                        className={classes.text}
                      >
                        削除
                      </Button>
                    </div>
                  </Modal>
                </Card>
              );
            }
          }
        })}
    </>
  );
};
const customStyles = {
  content: {
    padding: "20px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    maxHeight: "700px",
    maxWidth: "700px",
    height: "50vh",
    width: "90vw",
    transform: "translate(-50%, -50%)",
  },
};

const mapStateToProps = (state: {
  task: TASK[];
  date: DATE;
  user: User;
}): StateByProps => ({
  task: state.task,
  date: state.date,
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchByProps => ({
  updateTask: (title: string, memo: string, id: string) =>
    dispatch(updateTask(title, memo, id)),
  deleteTask: (id: string) => dispatch(deleteTask(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Task);
