import { WORKERS } from '../../../const'
import { BASE_URL, GET_USERS_IT } from '../../action-type'
import axios from 'axios'

export const getUsersIt = () => {
    return async (dispatch) => {
        try {
            const { data: response } = await axios(`${BASE_URL}/users/getItUsers`)

            const filterUsers = response.data?.filter((user) => WORKERS.includes(user.displayName))
            dispatch({ type: GET_USERS_IT, payload: filterUsers })
        } catch(error) {
            console.error(error)
        }
    }
}

