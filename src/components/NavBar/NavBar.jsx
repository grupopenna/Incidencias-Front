import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextInput } from "@tremor/react";
import { SearchIcon } from "../Icon";
import { useDispatch } from "react-redux";
import { getIssueByKey, clearIssueByKey } from '../../redux/actions'
import { useContext } from "react";
import { GlobalContext } from "../../context";

const NavBar = () => {
  const dispatch = useDispatch()
  const [pathName, setPathName] = useState('')
  const [searchParam, setSearchParam] = useState('')
  const navigate = useNavigate();
  const { setIsLoading } = useContext(GlobalContext)
  const redirect = () => {
    navigate('/')
  }
  let logo = 'https://www.grupopenna.com.ar/images/logo-footerBIG.png'
  //let logo ='https://softland.com.ar/wp-content/uploads/2020/09/logo-blanco-1.png'

  const handleSearch = async (event) => {
    if (event.code === 'Enter') {
      setIsLoading(true)
      clearIssueByKey()(dispatch)
      if (!searchParam.trim()) return
      await getIssueByKey(searchParam.trim())(dispatch)
      navigate('/search-issue', {
        replace: true
      })
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPathName(window.location.pathname)
    }
  }, [window.location.pathname])

  return (
    <header className='flex justify-between  mx-2 mt-2 p-3'>
      <button onClick={() => { redirect() }}>
        <img src={logo} className='flex items-start w-56 p-1'></img>
      </button>
  
      <nav className='flex relative justify-end items-center px-5 pt-1 gap-10'>

        <ul className="w-full flex gap-x-4 p-2 [&>li>a]:text-white">
          <li><Link className={`hover:bg-slate-500/20 p-3 rounded-md ${pathName.includes('sin-comenzar') ? 'bg-slate-500/20': ''}`} to={'/sin-comenzar'}>Incidencias sin comenzar</Link></li>
          <li><Link className={`hover:bg-slate-500/20 p-3 rounded-md ${pathName.includes('daily-report') ? 'bg-slate-500/20': ''}`} to={'/daily-report'}>Daily report</Link></li>
          <li><Link className={`hover:bg-slate-500/20 p-3 rounded-md ${pathName.includes('view-all-incidents/12') ? 'bg-slate-500/20': ''}`} to={'/view-all-incidents/12'}>Ver todas las incidencias</Link></li>
          <li><Link className={`hover:bg-slate-500/20 p-3 rounded-md ${pathName.includes('control-general') ? 'bg-slate-500/20': ''}`} to={'/control-general'}>Top 5</Link></li>
        </ul> 

          <TextInput 
            onChange={(event) => setSearchParam(event.target.value)}  
            onKeyUp={handleSearch} icon={SearchIcon} placeholder="CMS-21, FUN-12 ...." className={`${pathName === '/' ? 'opacity-0': ''} p-1 h-10 w-56`}/>
      </nav>
    </header>
  )
}

export default NavBar