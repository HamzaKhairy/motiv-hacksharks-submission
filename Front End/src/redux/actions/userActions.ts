import { UPDATE_USER } from "./actionTypes";

const updateUser = (value: any) => {
  return {
    type: UPDATE_USER,
    payload: value,
  };
};

export { updateUser };
