import { useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
// import { setUserData } from '../../redux/actions'
import { useEffect, useState } from 'react'
// import Swal from 'sweetalert2'
// import { postCheckToken } from '../../redux/actions/token/postCheckToken'

function ProtectedRoute() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'))

  if (!token || token == undefined) {
    navigate('/login')
    return
  }

  (async () => {
    const res = await fetch(`${import.meta.env.VITE_BACK_BASE_URL}/auth`,
        {
          headers: {
            authorization: `Bearer ${token}`
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
    // return children
  }
}

export default ProtectedRoute