import axios from 'axios';
import setAlert from './alert';
import { GET_PROFILE, PROFILE_ERROR } from './types'

//get current users profile

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me')
        console.log(res);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { message: error.response.statusText, status: error.response.status }
        })
    }
}