import { SET_USER_DATA } from '../../action-type'

export const setUserData = (data) => {
    return (dispatch) => {
       dispatch({ type: SET_USER_DATA, payload: data })       
    }
}