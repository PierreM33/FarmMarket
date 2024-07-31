
const initialState  = {
    token: null,
    user: null,
    userId: null,
}

export const Logger  = (state = initialState , action) => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                userId: action.payload.userId,
            };
        case 'LOGOUT':
            return {
                ...state,
                token: null,
                user: null,
                userId: null,
            };
        default:
            return state;
    }
};
