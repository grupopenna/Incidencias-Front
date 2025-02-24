import { useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

export const NotFound = () => {
  const {pathname} = useLocation()
  const navigate = useNavigate()

  useEffect(()=> {
    if (pathname != 'notFound'){
      navigate('/notFound')
    }
  }, [navigate, pathname])

  return (
    <main className='w-full min-h-screen bg-[#222933] flex flex-col justify-center items-center'>
      <h2 className='text-8xl text-white'>404</h2>
      <p className='text-xl text-slate-200'>Parece que la pagina a la que intentas entrar no existe</p>
      <Link to='/' className='mt-4 px-4 py-2 bg-slate-500 rounded-md text-white cursor-pointer'>
        Volver al home
      </Link>
    </main>
  )
}
