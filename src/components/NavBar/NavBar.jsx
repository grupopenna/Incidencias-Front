import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const redirect = () => {
    navigate('/')
  }
  let logo = 'https://www.grupopenna.com.ar/images/logo-footerBIG.png'
  //let logo ='https://softland.com.ar/wp-content/uploads/2020/09/logo-blanco-1.png'

  return (
    <div className='flex justify-between mx-2 mt-2'>
      <button onClick={() => { redirect() }}>
        <img src={logo} className='flex items-start w-56 p-1'></img>
      </button>
      <div className='flex justify-end px-5 pt-1'>
        <button onClick={() => navigate("/view-all-incidents/12")} className="rounded-xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#6025F5]/50">
          Ver todas las incidencias
        </button>
      </div>
    </div>
  )
}

export default NavBar