// actions.js
import database from '@react-native-firebase/database';

export const SET_POSTS = 'SET_POSTS';
export const SET_SELECTED_BOOK = 'SET_SELECTED_BOOK';
export const RECEIVE_BOOKS = 'FETCH_BOOKS';

export const receiveBooks = (books) => ({
  type: RECEIVE_BOOKS,
  payload: books,
});

export const setSelectedBook = (book) => ({
  type: SET_SELECTED_BOOK,
  payload: book,
});

export const setPosts = (posts) => ({
  type: SET_POSTS,
  payload: posts,
});

export const fetchBooks = () => {
  return async (dispatch) => {
    try {
      const snapshot = await database().ref('books').once('value');
      console.log('this is snap:', snapshot)
      const books = snapshot.val();
      console.log('this is books:', snapshot)
      if (books) {
        dispatch(receiveBooks(books));
      } else {
        dispatch(receiveBooks([])); // Dispatch an empty array if no books found
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      // Optionally, dispatch an action to handle fetch failure
    }
  };
};
