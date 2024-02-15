import { RECEIVE_BOOKS } from './actions';

const initialState = {
  books: [],
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_BOOKS:
      return {
        ...state,
        books: action.payload,
      };
    default:
      return state;
  }
};

export default booksReducer;
