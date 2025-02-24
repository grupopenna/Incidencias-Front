import { Link } from 'react-router-dom'
import { InboxEmail } from '../Icons'

function SendEmailSucces () {
  return (
    <main className='w-full min-h-screen bg-background flex flex-col justify-center items-center text-white'>
      <InboxEmail />
      <div className='w-11/12 max-w-sm flex flex-col items-center justify-center text-center mt-4 '>

        <p>¡Hemos enviado un correo electrónico para recuperar tu contraseña!
          Por favor, revisa tu bandeja de entrada y/o carpeta de spam.
        </p>

        <Link to='/login' className='mt-6 bg-buttonBg py-2 px-6 rounded-sm'>Ir al login</Link>
      </div>
    </main>
  )
}

export default SendEmailSucces
