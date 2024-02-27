import axios from 'axios'
import { BACK_AUTH_URL } from '../../action-type'

const sendMail = async (formData) => {

    const body = new URLSearchParams(formData).toString()
    try {
      const response = await axios.post(`${BACK_AUTH_URL}/auth/recovery-password`, body )
      console.log('response', response)

      return response


    } catch (err) {
      console.log('err', err)
      return err.response
    } 

}

export default sendMail