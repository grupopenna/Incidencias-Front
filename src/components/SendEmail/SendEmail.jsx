import { TextInput, Button } from '@tremor/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BASE_URL = import.meta.env.VITE_BACK_AUTH_URL

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
      const response = await fetch(`${BASE_URL}/auth/recovery-password`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(formData).toString()
      })

      if (!response.ok) {
        setError(ERRORS[response.status] || 'Ocurrio un error')
        return
      }

      navigate('/send-email/success')
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

        {error && <span className='text-center text-warning'>{error}</span>}
      </form>
    </main>
  )
}

export default SendEmail
