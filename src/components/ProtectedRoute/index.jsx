import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { setUserData } from '../../redux/actions'
import { BACK_AUTH_URL} from '../../redux/action-type'
import { useEffect, useState } from 'react'

function ProtectedRoute() {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    
    // REMOVE LOG:
    console.log(import.meta.env.VITE_REDIRECT_URL)
    alert('')
    if (!token) {
        window.location.href = import.meta.env.VITE_REDIRECT_URL
        return 
    }
    
    (async () => {
        const response = await fetch(`${BACK_AUTH_URL}/auth/check-url-token`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        
        if (!response.ok) {
            window.location.href = import.meta.env.VITE_REDIRECT_URL
            return 
        }

        const { data } = await response.json()

        localStorage.setItem('userData', JSON.stringify({ token: data.token, user: data.user }))
        setUserData(data.user)(dispatch)
        setIsLoading(false)

    })()

   }, [])

   if (isLoading) {
    return <div className='w-6 h-6 rounded-full  m-auto border-2 border-white border-l-transparent animate-spin '/>
   }


    return <Outlet />
}

export default ProtectedRoute