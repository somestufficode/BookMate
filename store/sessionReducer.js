// Define initial state for session
const initialState = {
    currentUser: null,
    isAuthenticated: false,
    loading: false,
    error: null
  };
  
  
import { SET_CURRENT_USER, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './actions';

  // Reducer function for managing session state
  const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_CURRENT_USER:
        return {
          ...state,
          currentUser: action.payload,
          isAuthenticated: !!action.payload // Convert to boolean
        };
      case LOGIN_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          currentUser: action.payload,
          error: null
        };
      case LOGIN_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      case LOGOUT:
        return {
          ...state,
          currentUser: null,
          isAuthenticated: false,
          error: null
        };
      default:
        return state;
    }
  };
  
  export default sessionReducer;
  