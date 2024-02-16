import { combineReducers } from 'redux';
// import postsReducer from './postsReducer';
import userReducer from './userReducer';
import booksReducer from './booksReducer';
// import sessionReducer from './sessionReducer';

const rootReducer = combineReducers({
    // session,
    // errors, 
    // session: sessionReducer,
    books: booksReducer,
    user: userReducer,
    // session: sessionReducer
    // posts: postsReducer
  });

export default rootReducer