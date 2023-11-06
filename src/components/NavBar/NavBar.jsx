import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReloadIcon } from "../Icons";
import { useContext } from "react";
import { GlobalContext } from "../../context";

const NavBar = () => {
  const [pathname, setPathname] = useState('')
  const { setReload } = useContext(GlobalContext)
  const navigate = useNavigate();
  const redirect = () => {
    navigate('/')
  }
  let logo = 'https://www.grupopenna.com.ar/images/logo-footerBIG.png'
  //let logo ='https://softland.com.ar/wp-content/uploads/2020/09/logo-blanco-1.png'


  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname])

  return (
    <div className='flex justify-between mx-2 mt-2'>
      <button onClick={() => { redirect() }}>
        <img src={logo} className='flex items-start w-56 p-1'></img>
      </button>
      {pathname.includes('board') &&
        <button
          onClick={() => setReload(true)} className="bg-buttonBg px-4 py-2 mt-4 rounded-md text-white hover:bg-buttonBg/80">
          <ReloadIcon />
        </button>}
      <div className='flex justify-end px-5 pt-1'>
        {!pathname.includes('view-all-incidents') && <button
          onClick={() => navigate("/view-all-incidents/12")}
          className="rounded-xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#6025F5]/50">
          Ver todas las incidencias
        </button>}
      </div>
    </div>
  )
}

export default NavBar