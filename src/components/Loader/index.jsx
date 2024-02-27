/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Loader () {
  const navigate = useNavigate()


  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('token'))

    if (!userData){
      return navigate('/login')
    }
    // console.log('userData', userData)

    // fetch(`${import.meta.env.VITE_BACK_BASE_URL}/auth`, {
    //   headers: {
    //     authorization: `Bearer ${userData?.token}`
    //   }
    // })
    //   .then(async res => {
    //     if (!res.ok) {
    //       return navigate('/login')
    //     }
    //     const { data } = await res.json()
    //     localStorage.setItem('urlToken', data.urlToken)
    //     navigate('/dashboard')
    //   }).catch((err) => {
    //     console.log('navigate')
    //     if (err) navigate('/dashboard')
    //   })
  }, [])

  return (
    <main className='w-screen min-h-screen bg-background flex justify-center items-center'>
      <div className='w-8 h-8 border-2 border-white rounded-full animate-spin border-r-transparent' />
    </main>
  )
}

export default Loader
