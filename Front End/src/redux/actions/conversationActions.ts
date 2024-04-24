import { UPDATE_CONVERSATION_USER_IDS } from "./actionTypes";

const updateConversationUserIds = (value: any) => {
  return {
    type: UPDATE_CONVERSATION_USER_IDS,
    payload: value,
  };
};

export { updateConversationUserIds };
