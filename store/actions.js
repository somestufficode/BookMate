// actions.js
export const SET_POSTS = 'SET_POSTS';
export const SET_SELECTED_BOOK = 'SET_SELECTED_BOOK';
export const setSelectedBook = (book) => ({
  type: SET_SELECTED_BOOK,
  payload: book,
});

export const setPosts = (posts) => ({
  type: SET_POSTS,
  payload: posts,
});
