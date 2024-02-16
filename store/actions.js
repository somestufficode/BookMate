import database from '@react-native-firebase/database';

export const SET_POSTS = 'SET_POSTS';
export const SET_SELECTED_BOOK = 'SET_SELECTED_BOOK';
export const RECEIVE_BOOKS = 'RECEIVE_BOOKS';
export const SET_USER = 'SET_USER';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

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

export const setCurrentUser = (userData) => ({
  type: SET_CURRENT_USER,
  payload: {
    uid: userData.uid,
    email: userData.email,
    name: userData.name
  }
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
})

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});

export const fetchBooks = () => {
  return async (dispatch) => {
    try {
      const snapshot = await database().ref('books').once('value');
      const books = snapshot.val();
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
