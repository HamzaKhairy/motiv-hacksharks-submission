import { UPDATE_CONVERSATION_USER_IDS } from "../actions/actionTypes";

const initialState = {
  userIds: [],
};

const conversationReducer = (state = initialState, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case UPDATE_CONVERSATION_USER_IDS:
      return {
        ...state,
        userIds: action.payload,
      };

    default:
      return state;
  }
};

export default conversationReducer;