import { SET_ALERT, REMOVE_ALERT, REGISTER_FAILED, REGISTER_SUCCESS } from '../actions/types';
const Initial_state = [];

export default alert = (state = Initial_state, action) => {
    switch (action.type) {
        case SET_ALERT:
            return [...state, action.payload];
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== action.payload.id);
        default:
            return state;
    }
}