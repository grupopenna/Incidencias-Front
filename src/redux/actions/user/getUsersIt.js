import { WORKERS } from '../../../const'
import { BASE_URL, GET_USERS_IT } from '../../action-type'
import axios from 'axios'
import { ALEJANDRO_JIRA } from '../../../utils/jqls'

export const getUsers = (area) => {

    if (!area) area = "sistemas"

    return async (dispatch) => {
        try {
            const { data: response } = await axios(`${BASE_URL}/users/getItUsers/?area=${area}`)

            const filterUsers = response.data?.filter((user) => WORKERS.includes(user.displayName))
            // console.log('filterUsers', [...filterUsers, ALEJANDRO_JIRA])
            dispatch({ type: GET_USERS_IT, payload: [...filterUsers, ALEJANDRO_JIRA] })
        } catch(error) {
            console.error(error)

        }
    }
}

