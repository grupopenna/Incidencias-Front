import axios from 'axios'
import { BACK_AUTH_URL, SET_USER_DATA } from '../../action-type'

const loginUser = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${BACK_AUTH_URL}/auth/login`, data)

      if (response.status === 201) {
        const res = response.data
        const tokenUser = JSON.stringify(res.data.token)
        localStorage.setItem('token', tokenUser)
        localStorage.setItem('urlToken', res.data.urlToken)

        localStorage.setItem('userData', JSON.stringify(res.data.data))
        
        dispatch({ type: SET_USER_DATA, payload: res.data.data })

        return response
      }

      if (response.status === 400) {
        console.log('response error 400', response)
      }

      return response.data
    } catch (error) {
      if (error.message === 'Contraseña incorrecta') throw new Error('Contraseña incorrecta')
      return error.response
    }
  }
}
export default loginUser