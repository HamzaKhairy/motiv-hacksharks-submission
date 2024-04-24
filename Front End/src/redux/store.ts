// store.js
import { createStore, combineReducers } from 'redux';
import conversationReducer from './reducers/conversationReducer';
import userReducer from './reducers/userReducer';
import { UserType } from '../types/userTypes';

export interface RootState {
  conversationReducer: any;
  user: UserType;
  // Add other reducers here
}

const rootReducer = combineReducers({
  conversationReducer: conversationReducer,
  user: userReducer,
  // Add other reducers here
});

const store = createStore(rootReducer);
export default store;
