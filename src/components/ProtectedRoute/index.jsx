import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { setUserData } from '../../redux/actions'
import { useEffect, useState } from 'react'

function ProtectedRoute() {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    if (!token) {
        window.location.href = 'http://localhost:5174/'
        return 
    }
    
    (async () => {
        const response = await fetch('http://localhost:3002/auth/check-url-token', {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        
        if (!response.ok) {
            window.location.href = 'http://localhost:5174/login'
            return 
        }

        const { data } = await response.json()

        console.log({ data })
        localStorage.setItem('userData', JSON.stringify({ token: data.token, user: data.user }))
        setUserData(data.user)(dispatch)
        setIsLoading(false)

    })()

   }, [])

   if (isLoading) {
    return <div className='w-6 h-6 rounded-full border-2 border-white border-l-transparent animate-spin '/>
   }


    return <Outlet />
}

export default ProtectedRoute