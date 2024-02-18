const initialState = {
        email: null,
        name: null,
        number: null,
        id: null,
        isAuthenticated: false,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                    email: action.payload.email,
                    name: action.payload.displayName,
                    number: action.payload.phoneNumber,
                    photo: action.payload.photoURL,
                    id: action.payload.uid,
                    isAuthenticated: !!action.payload
            };
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};

export default userReducer;
