import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const redirect = () => {
    navigate('/')
  }

  return (
    <div className='flex justify-between mx-2 mt-2'>
      <button onClick={() =>{redirect()}}>
        <img src='https://softland.com.ar/wp-content/uploads/2020/09/logo-blanco-1.png' className='flex items-start w-56 p-1'></img>
      </button>
        {/* <div className='flex gap-2'>
          <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
              <input type="text" name="first-name" id="first-name" className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0" placeholder="First name" />
              <label htmlFor="first-name" className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0">First name</label>
          </div>
          <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
              <input type="text" name="email" id="email" className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0" placeholder="email" />
              <label htmlFor="email" className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0">email</label>
          </div>
        </div> */}
        
      </div>
  )
}

export default NavBar