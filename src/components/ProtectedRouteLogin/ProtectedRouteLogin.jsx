// import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'

function ProtectedRouteLogin ({ children }) {
  // const [isLoading, setIsLoading] = useState(true)
  // const [isAuthenticated, setIsAuthenticated] = useState(false)
  // const navigate = useNavigate()
  // useEffect(() => {
  //   async function getAuth () {
  //     const userData = JSON.parse(localStorage.getItem('token'))
  //     const res = await fetch(`${import.meta.env.VITE_BACK_BASE_URL}/auth`,
  //       {
  //         headers: {
  //           authorization: `Bearer ${userData?.token}`
  //         }
  //       })
  //     try {
  //       if (res.ok) {
  //         const { data } = await res.json()
  //         localStorage.setItem('urlToken', data.urlToken)
  //         setIsAuthenticated(true)
  //       }
  //     } catch (err) {
  //       console.error(err)
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }

  //   getAuth()
  // }, [])

  // if (isLoading) {
  //   return (
  //     <main className='w-screen min-h-screen bg-background flex justify-center items-center'>
  //       <div className='w-8 h-8 border-2 border-white rounded-full animate-spin border-r-transparent' />
  //     </main>
  //   )
  // }

  // if (!isAuthenticated) {
    return children
  // }

  // navigate('/')
}

export default ProtectedRouteLogin
