import { combineReducers } from 'redux';
import postsReducer from './postsReducer';
import userReducer from './userReducer';
import booksReducer from './booksReducer';

const rootReducer = combineReducers({
    // session,
    // errors, 
    // session: sessionReducer,
    books: booksReducer,
    user: userReducer,
    posts: postsReducer
  });

export default rootReducer