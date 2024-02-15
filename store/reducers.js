import { combineReducers } from 'redux';
import postsReducer from './postsReducer';

const rootReducer = combineReducers({
    // session,
    // errors, 
    posts: postsReducer
  });

export default rootReducer