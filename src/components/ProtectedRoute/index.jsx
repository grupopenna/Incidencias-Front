// import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
// import { setUserData } from '../../redux/actions'
// import { useEffect, useState } from 'react'

function ProtectedRoute() {
    // const dispatch = useDispatch()
    // const [isLoading, setIsLoading] = useState(true)

//    useEffect(() => {
//     const params = new URLSearchParams(window.location.search)
//     let token = params.get('token')

//     if (!token) {

//         const savedToken = localStorage.getItem('urlToken')

//         if (!savedToken) {
//             window.location.href = import.meta.env.VITE_REDIRECT_URL
//             return 
//         }

//         token = savedToken
//     } else {
//         localStorage.setItem('urlToken', token)
//     }
    
//     (async () => {
//         const response = await fetch(`${import.meta.env.VITE_BACK_AUTH_URL}/auth/check-url-token`, {
//             headers: {
//                 authorization: `Bearer ${token}`
//             }
//         })
        
//         if (!response.ok) {
//             window.location.href = import.meta.env.VITE_REDIRECT_URL
//             return 
//         }

//         const { data } = await response.json()

//         localStorage.setItem('userData', JSON.stringify({ token: data.token, user: data.user }))
//         setUserData(data.user)(dispatch)
//         setIsLoading(false)

//     })()

//    }, [])

//    if (isLoading) {
//     return <div className='w-6 h-6 rounded-full  m-auto border-2 border-white border-l-transparent animate-spin '/>
//    }


    return <Outlet />
}

export default ProtectedRoute