import { ReloadIcon } from "../Icons"

const SideBar = ({
    pathname,
    navigate,
    setReload,
    handleNotify
}) => {
  return (
    <aside className="w-full col-span-1 border-r border-r-slate-500 left-0 flex flex-col gap-y-4 h-full items-center  p-2 ">

    <div className="flex w-full justify-center p-2 gap-2">
        <button onClick={() => { handleNotify() }} className="bg-indigo-600 px-4 py-2 rounded-md text-white">Notificar Incidencias</button>
    
      {pathname?.includes('board') &&
        <button
          onClick={() => setReload(true)}
          aria-label="reload"
          className=" bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-500 px-2 py-2  rounded-md text-white transition duration-200 hover:shadow-lg hover:shadow-[#6025F5]/50">
          <ReloadIcon />
        </button>}
    </div>
     {!pathname?.includes('view-all-incidents') && 
      <div className="w-full flex justify-center rounded-md bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-500 px-5 py-2 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#6025F5]/50">
      <button
          onClick={() => navigate("/view-all-incidents/12")}
          className="w-full"
          >
          Ver todas las incidencias
        </button>
      </div>
        
      }
      <div className="w-full flex justify-center rounded-md bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-500 px-5 py-2 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#6025F5]/50">
          <button className="w-full" onClick={() => navigate("/general-sistemas")} >
              Control sistemas
          </button>
      </div>
    </aside>
  )
}

export default SideBar
