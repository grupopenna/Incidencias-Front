import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { postCheckToken } from '../../redux/actions/token/postCheckToken'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { setUserData } from '../../redux/actions'

function ProtectedRouteLogin () {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    
    (async () => {
      const token = JSON.parse(localStorage.getItem('token'))
      postCheckToken(token)(dispatch).then((response)=> {
        
        if (response.status <= 300 && response.status >= 200) {
          setIsLoading(false)
          navigate('/dashboard')
          Swal.fire({
            icon: "error",
            title: response.status,
            text: response.data?.message ? response.data?.message : response.statusText
          });
          return
        }
  
        if (response.status >= 300 && response.status < 500) {
          setIsLoading(false)
          navigate('/login')
          Swal.fire({
            icon: "error",
            title: response.status,
            text: response.data?.message ? response.data?.message : response.statusText
          });
          return
        }
  
        const { data } = response.data
  
        localStorage.setItem('userData', JSON.stringify({ token: data.token, user: data.data }))
        setUserData(data.data)(dispatch)
        
  
      }).catch((err) => {
        console.log('err', err)
      })
  
    })()

  }, [dispatch, navigate])

  if (isLoading) {
    return (
      <main className='w-screen min-h-screen bg-background flex justify-center items-center'>
        <div className='w-8 h-8 border-2 border-white rounded-full animate-spin border-r-transparent' />
      </main>
    )
  }

  return <Outlet />

}

export default ProtectedRouteLogin
