import { ADD_TASK, DELETE_TASK, UPDATE_TASK } from "../actions/taskAction";
import { TASK } from "../types/type";
const initialState: TASK[] = [];

type PAYLOAD = TASK & number;

const task = (
  state = initialState,
  action: { type: string; payload: PAYLOAD }
) => {
  switch (action.type) {
    case ADD_TASK:
      let newState: TASK[] = [];
      newState = [
        ...state,
        {
          title: action.payload.title,
          memo: action.payload.memo,
          date: action.payload.date,
          id: action.payload.id,
          hour: action.payload.hour,
        },
      ];
      return newState;
    case UPDATE_TASK:
      return [
        ...state.map((task) => {
          if (task.id === action.payload.id) {
            return {
              ...task,
              title: action.payload.title,
              memo: action.payload.memo,
            };
          } else {
            return task;
          }
        }),
      ];
    case DELETE_TASK:
      return state.filter((task) => {
        return task.id !== action.payload.id;
      });

    default:
      return state;
  }
};

export default task;
