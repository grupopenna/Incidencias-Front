// import { useState } from 'react'
// import { loginUser } from '../../utils/Fetchs'
// import { EyeClose, EyeOpen } from '../../components/Icons'
// import { validateLogin } from '../../utils/FormValidates'
// import { Link, useNavigate } from 'react-router-dom'

// const LoginForm = () => {
//   const [loginData, setLoginData] = useState({
//     email: '',
//     password: ''
//   })

//   const [loading, setLoading] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)
//   const [mesaggeError, setMesaggeError] = useState(true)
//   const [errors, setErrors] = useState({})
//   const navigate = useNavigate()
//   const handlerDataRegister = (e) => {
//     setLoginData({
//       ...loginData,
//       [e.target.name]: e.target.value
//     })
//   }

//   const submitRegister = async (event) => {
//     event.preventDefault()
//     setLoading(true)
//     const value = Object.keys(validateLogin(loginData, setMesaggeError))
//     const emailError = value.some(e => e === 'email')
//     const passError = value.some(e => e === 'password')
//     if (emailError || passError) {
//       setErrors(validateLogin(loginData, setMesaggeError))
//       setLoading(false)
//       return
//     }
//     try {
//       await loginUser(loginData)
//       navigate('/dashboard')
//     } catch (err) {
//       console.log(err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <main className='w-screen min-h-screen flex flex-col justify-center items-center bg-[#222933]'>
//       <section className='w-11/12 max-w-6xl m-auto h-[600px] bg-componentBg flex flex-col justify-center items-center'>
//         <div className='flex w-11/12 flex-col p-4'>
//           <h2 className='text-font font-titilliumWeb text-xl'>Solicitud de compra</h2>
//           <p className='text-slate-300'>Ingrese sus datos para ingresar</p>
//         </div>
//         <form onSubmit={submitRegister} className=' w-11/12 max-w-md m-auto bg-componentBg  justify-center items-center p-2 flex flex-col rounded-md'>
//           <div className='w-11/12 flex flex-col p-2 gap-1'>
//             <label htmlFor='email' className='text-font'>Email</label>
//             <input className='w-full py-2 p-3' type='text' name='email' placeholder='tuemail@gmai.com' onChange={(e) => handlerDataRegister(e)} />
//             {mesaggeError && <span className='text-warning'>{errors.email}</span>}
//           </div>

//           <div className='w-11/12 relative flex flex-col mt-4 p-2 gap-1'>
//             <label htmlFor='email' className='text-font'>Contraseña</label>
//             <div>{mesaggeError && <span className='text-warning'>{errors.password}</span>}</div>
//             <input className='w-full py-2 p-3' type={showPassword ? 'text' : 'password'} name='password' placeholder='**********' onChange={(e) => handlerDataRegister(e)} />
//             <span
//               className='absolute right-6 bottom-4 lg:cursor-pointer'
//               onClick={() => { setShowPassword(!showPassword) }}
//             >{showPassword ? <EyeOpen color='#929DAE' /> : <EyeClose color='#929DAE' />}
//             </span>
//           </div>

//           <button disabled={loading} className='bg-buttonBg w-[70%] mt-4 mb-4 p-2 text-font rounded-md hover:bg-buttonBg/80'>
//             {loading ? <div className='w-6 h-6 border-2 m-auto border-white rounded-full animate-spin border-r-transparent' /> : 'Iniciar sesión'}
//           </button>
//           <Link to='/send-email' className='underline text-sky-600 text-sm mt-4'>Olvide mi Contraseña</Link>
//         </form>
//       </section>
//     </main>
//   )
// }

// export default LoginForm
