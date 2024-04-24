import { UPDATE_USER } from "../actions/actionTypes";
import { UserType } from "../../types/userTypes";

const initialState: UserType = {
    id: "",
    firstName: "",
    lastName: "",
    subtext: "",
    pfp: "",
    roles: [""], //added for docker creation
    studentCode: "", //added for docker creation
};

interface Action {
    type: typeof UPDATE_USER;
    payload: UserType;
}

const userReducer = (state: UserType = initialState, action: Action): UserType => {
    switch (action.type) {
        case UPDATE_USER:
            return action.payload

        default:
            return state;
    }
};

export default userReducer;