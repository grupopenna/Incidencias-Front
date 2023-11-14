import { BASE_URL, GET_USERS_IT } from '../../action-type'
import axios from 'axios'

export const getUsersIt = () => {
    return async (dispatch) => {
        try {
            const response = await axios(`${BASE_URL}/users/getItUsers`)

            dispatch({ type: GET_USERS_IT, payload: response.data.data })
        } catch(error) {
            console.error(error)
        }
    }
}

