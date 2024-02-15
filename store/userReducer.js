const initialState = {
    user: null,
    isAuthenticated: false,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: !!action.payload
            };
        default:
            return state;
    }
};

export default userReducer;