/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { setUserData } from '../../redux/actions'
import validateToken from '../../redux/actions/token/validateToken'

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
      // setIsAuthenticated(false)
      setIsLoading(false)
    }
    
    (async ()=>{
      await validateToken(token).then((res) => {
        if (res.status == 200) {
          setIsLoading(false)
          setIsAuthenticated(false)
        }
        if (res.status >= 300) {
          localStorage.removeItem("token");
          setIsLoading(false)
          navigate('/login')
        }
      }).catch((err) => {
        console.log('err', err)
      })
    })()
  // (async () => {
    //   const res = await fetch(`${import.meta.env.VITE_BACK_AUTH_URL}/auth`,
  //     try {
    //       if (res.ok) {
  //         const { data } = await res.json()
  //         localStorage.setItem('urlToken', data.urlToken)
  
  //       }
  //     } catch (err) {
    //       console.error(err)
    //     } finally {
      //       setIsLoading(false)
      //     }
      
      // })()
      
    }, [])
    
    if (isLoading) {
      return <main className='w-screen min-h-screen bg-background flex justify-center items-center'>
        <div className='w-8 h-8 border-2 border-white rounded-full animate-spin border-r-transparent' />
      </main>
    }
    
    if (!isAuthenticated) {
    return <Outlet />
  }
}

export default ProtectedRoute