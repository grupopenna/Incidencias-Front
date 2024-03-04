import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import validateToken from '../../redux/actions/token/validateToken'

function Loader () {
  const navigate = useNavigate()
  const location = useLocation()
  const { pathname } = location

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('token'))

    if (!userData){
      return navigate('/login')
    }

    console.log('userData2', userData)

    (async()=>{
      await validateToken(userData).then((res) => {
        if (res.status == 200) {
          if (pathname.length < 2){
            return navigate('/dashboard')
          }
          if (pathname.includes('token')){
            return navigate('/dashboard')
          }
        }
        if (res.status >= 300) {
          localStorage.removeItem("token");
          navigate('/login')
        }
      }).catch((err) => {
        console.log('err', err)
      })
    })()

  }, [pathname, navigate])

  return (
    <main className='w-screen min-h-screen bg-background flex justify-center items-center'>
      <div className='w-8 h-8 border-2 border-white rounded-full animate-spin border-r-transparent' />
    </main>
  )
}

export default Loader
