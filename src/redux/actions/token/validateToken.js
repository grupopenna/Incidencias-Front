import axios from "axios"
import { BACK_AUTH_URL } from '../../action-type'

const validateToken = async (token) => {
    try {
      const res = await axios.get(`${BACK_AUTH_URL}/auth/`, {
        "headers": {
          "Authorization": `Bearer ${token}`
        }
      })

      return res
      
    } catch (error) {
      console.log('error validateToken', error)
      return error.response
    }
}

export default validateToken