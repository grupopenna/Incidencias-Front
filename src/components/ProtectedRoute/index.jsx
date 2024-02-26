import { useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { setUserData } from '../../redux/actions'

function ProtectedRoute() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'))
    const userData = JSON.parse(localStorage.getItem('userData'))


  if (!token || token == undefined) {
    navigate('/login')
    return
  }

  if(userData){
    setUserData(userData)(dispatch)
  }

  (async () => {
    const res = await fetch(`${import.meta.env.VITE_BACK_AUTH_URL}/auth`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      try {
        if (res.ok) {
          const { data } = await res.json()
          localStorage.setItem('urlToken', data.urlToken)
          setIsAuthenticated(true)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }

  })()

  }, [dispatch, navigate])

  if (isLoading) {
    return <div className='w-6 h-6 rounded-full m-auto border-2 border-white border-l-transparent animate-spin '/>
  }

  if (!isAuthenticated) {
    return <Outlet />
  }
}

export default ProtectedRoute