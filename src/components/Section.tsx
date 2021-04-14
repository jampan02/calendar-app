import React, { FC, useState } from "react";
import Modal from "react-modal";
import { addTask } from "../actions/taskAction";
import { connect } from "react-redux";
import { DATE, DispatchByProps, TASK, StateByProps, User } from "../types/type";
import { Dispatch } from "redux";
import Task from "./Task";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import { onAdd } from "../api/api";
interface PROPS extends DispatchByProps {
  hour: number;
  date?: DATE;
  currentHour?: number;
  user?: User;
}
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
    display: "flex",
    padding: 0,
  },
  isNone: {
    display: "none",
  },
  task: {
    display: "flex",
  },
  modal: {
    inset: "200px",
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
});

const Section: FC<PROPS> = ({ addTask, hour, date, user }) => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  //const [id, setId] = useState<string | undefined>();
  const onAddTask = async () => {
    if (!title) {
      alert("タイトルは必須です");
      return;
    }
    if (addTask) {
      if (date) {
        if (user && user.uid) {
          const id = await onAdd(user.uid, title, memo, date, hour);
          id && addTask({ title, memo, date, hour, id });
        }
        setIsOpen(false);
      }
    }
  };

  return (
    <>
      <Typography variant="h5" component="h2">
        <Button size="large" onClick={() => setIsOpen(true)}>
          {hour}時
        </Button>
      </Typography>
      <Container className={classes.container}>
        <Task hour={hour} />
      </Container>

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
            id="standard-basic"
            label="タイトル"
            onChange={(e) => setTitle(e.target.value)}
            className={classes.text}
          />
          <TextField
            id="filled-multiline-static"
            label="メモ"
            multiline
            rows={4}
            variant="filled"
            className={classes.text}
            onChange={(e) => setMemo(e.target.value)}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={onAddTask}
          className={classes.text}
        >
          追加
        </Button>
      </Modal>
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

//空でも良いので、mapStateToPropsを記述
const mapStateToProps = (state: { date: DATE; user: User }): StateByProps => ({
  date: state.date,
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchByProps => ({
  addTask: ({ title, memo, date, hour, id }: TASK) =>
    dispatch(addTask({ title, memo, date, hour, id })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Section);
