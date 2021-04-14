import { SET_UID } from "../actions/userAction";
import { User } from "../types/type";

const initialState: User = {};

const user = (
  state = initialState,
  action: { type: any; payload: { uid: any } }
) => {
  switch (action.type) {
    case SET_UID:
      return {
        uid: action.payload.uid,
      };
    default:
      return state;
  }
};

export default user;
