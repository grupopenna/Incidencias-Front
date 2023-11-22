import { useEffect, useState } from "react"
import { AlertIcon } from "../Icons"

const SideBar = ({
    navigate,
    handleNotify
}) => {
  const [key, setKey] = useState('')


  useEffect(() => {
    if (typeof window !== 'undefined') {
      setKey(window.location.pathname.split('/').slice(-1)[0])
    }
  }, [window.location.pathname])

  return (
    <aside className="w-full h-screen col-span-1 left-0 flex flex-col gap-y-4 items-center  p-4 ">

    <div className="flex flex-col  w-full justify-between p-2 gap-2">
        <button onClick={() => { handleNotify() }} className="bg-indigo-600 px-4 py-2 rounded-md text-white">Notificar Incidencias</button>
  

        {key === 'CFS' || key  === 'CMS' ? (
           <div className="flex flex-col items-center rounded-lg pl-2 py-2 bg-bgIncident">
           <AlertIcon/>
           <span className="text-white">Si su tarjeta no esta revise los mail ó</span>
           <button onClick={() => navigate(`/proxSprint/${key}`)} className="px-3 py-1">
             <span className="text-buttonBg hover:underline">Haga click aqui</span>
           </button>
         </div>
        ): null}
    </div>
    </aside>
  )
}

export default SideBar
