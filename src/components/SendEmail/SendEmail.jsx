import { TextInput, Button } from '@tremor/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import sendMail from '../../redux/actions/password/sendMail'

const BASE_URL = import.meta.env.VITE_BACK_AUTH_URL
console.log('BASE_URL', BASE_URL)

const ERRORS = {
  400: 'Email incorrecto',
  500: 'Ocurrió un error, inténtelo mas tarde'
}

function SendEmail () {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    const form = event.target
    const formData = new FormData(form)

    if (!formData.get('email')) {
      setIsLoading(false)
      setError('Por favor llene todos los campos')
      return
    }

    try {

      await sendMail(formData).then((res)=>{
        if (res.status == 200){
          setIsLoading(false)
          navigate('/send-email/success')
        }
        if (res.status >= 300){
          setError(ERRORS[res.status] || 'Ocurrio un error')
          setIsLoading(false)
        }
      }).catch((err) => {
        if (err){
          setError(ERRORS[err.status] || 'Ocurrio un error')
          setIsLoading(false)
        }
      })
    
    } catch (err) {
      console.log({ err })
      setError('Ocurrio un error')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <main className='w-screen min-h-screen bg-background flex flex-col justify-center items-center'>
      <form onSubmit={handleSubmit} className='w-11/12 m-auto max-w-sm flex flex-col gap-y-2'>
        <p className=' text-white mb-1'>Ingrese su dirección de email asociada a la cuenta y enviaremos un link para resetear la contraseña.</p>
        <TextInput placeholder='tuemail@gmail.com' name='email' />
        <Button>
          {isLoading ? <div className='w-6 h-6 m-auto rounded-full border-2 border-l-transparent border-white animate-spin' /> : 'Enviar'}
        </Button>

        {error && <span className='text-center text-red-500'>{error}</span>}
      </form>
    </main>
  )
}

export default SendEmail
