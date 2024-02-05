import { WORKERS } from '../../../const'
import { BASE_URL, GET_USERS_IT } from '../../action-type'
import axios from 'axios'

export const getUsers = (area) => {

    return async (dispatch) => {
        const alej = {
            "accountId": "qm:c0387339-02b1-4e0d-8f36-3232066900ca:cf762601-8fa8-4c76-ba13-b749978052bd",
            "displayName": "Alejandro Guerrero"
        }
        try {
            const { data: response } = await axios(`${BASE_URL}/users/getItUsers/?area=${area}`)

            const filterUsers = response.data?.filter((user) => WORKERS.includes(user.displayName))
            // console.log('filterUsers', [...filterUsers, alej])
            dispatch({ type: GET_USERS_IT, payload: [...filterUsers, alej] })
        } catch(error) {
            console.error(error)

        }
    }
}

