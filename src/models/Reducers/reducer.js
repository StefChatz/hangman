import {STORE_WORD} from '../actionTypes'
import {combineReducers} from "redux";

const initialState = {
  word: '',
}

const wordReducer = (state = initialState, action) => {
  console.log('?>?>', action)
  
  switch (action.type) {
    case STORE_WORD:
      return {word: action.payload};
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  wordReducer
});

export {initialState, wordReducer};
export default rootReducer;