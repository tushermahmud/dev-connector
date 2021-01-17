import { REGISTER_FAILED, REGISTER_SUCCESS, LOGIN_SUCCESS, LOGIN_FAILED, USER_LOADED, AUTH_ERROR, LOGOUT } from "../actions/types"


const INITIAL_STATE = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

const registration = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }
        case AUTH_ERROR:
            localStorage.getItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAILED:
        case LOGIN_FAILED:
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state;
    }
}
export default registration;