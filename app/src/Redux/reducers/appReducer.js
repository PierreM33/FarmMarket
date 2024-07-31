const initialStateApp = {
    state: {
        message: null,
        type: null
    },
    loginFromRegister: false,
}

export const AppState = (state = initialStateApp, action) => {
    let nextState
    switch (action.type) {
        case 'SET_STATE':
            nextState = {
                ...state,
                state: action.data
            }
            return nextState || state
        case 'REMOVE_STATE':
            nextState = {
                ...state,
                state: {}
            }
            return nextState || state
        case 'SET_LOGIN_FROM_REGISTER':
            nextState = {
                ...state,
                loginFromRegister: action.data
            }
            return nextState || state
        default:
            return state;
    }
};
