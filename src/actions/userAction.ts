export const SET_UID = "SET_UID";

export const setUid = (uid: string) => {
  return {
    type: SET_UID,
    payload: { uid },
  };
};
