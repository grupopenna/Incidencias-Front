import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertIcon } from "../Icons";

const NavBar = () => {
  const [key, setKey] = useState('')
  const [pathName, setPathName] = useState('')
  const navigate = useNavigate();
  const redirect = () => {
    navigate('/')
  }
  let logo = 'https://www.grupopenna.com.ar/images/logo-footerBIG.png'
  //let logo ='https://softland.com.ar/wp-content/uploads/2020/09/logo-blanco-1.png'


  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPathName(window.location.pathname)
      setKey(window.location.pathname.split('/').slice(-1)[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname])

  return (
    <div className='flex justify-between  mx-2 mt-2 p-3'>
      <button onClick={() => { redirect() }}>
        <img src={logo} className='flex items-start w-56 p-1'></img>
      </button>
  
      <div className='flex justify-end px-5 pt-1'>
        {key === 'CFS' || key  === 'CMS' ? (
           <div className="flex items-center rounded-lg pl-2 bg-bgIncident">
           <AlertIcon />
           <span className="text-white">Si su tarjeta no esta revise los mail ó</span>
           <button onClick={() => navigate(`/proxSprint/${key}`)} className="px-3 py-1">
             <span className="text-buttonBg hover:underline">Haga click aqui</span>
           </button>
         </div>
        ): null}

         {pathName === '/' && <button
          onClick={() => navigate("/view-all-incidents/12")}
          className="rounded-md bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-500 px-5 py-2 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#6025F5]/50">
          Ver todas las incidencias
        </button>}
      </div>
    </div>
  )
}

export default NavBar