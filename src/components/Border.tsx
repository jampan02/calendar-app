import React, { FC, useState } from "react";
import Modal from "react-modal";
import { addTask } from "../actions/taskAction";
import { connect } from "react-redux";
import { DATE, DispatchByProps, TASK, StateByProps } from "../types/type";
import { Dispatch } from "redux";
import Task from "./Task";

const Border = () => {
  return <div>Border</div>;
};

export default Border;
