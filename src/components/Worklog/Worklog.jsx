/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useState } from "react";

const Worklog = ({ itemSelect }) => {
  const [item, setItem] = useState(null)
  const [time, setTime] = useState("");

  useEffect(() => {
    setItem(itemSelect)
  }, [item])

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  }

  // function convertirTiempoASegundos(tiempo) {
  //   // Dividir el tiempo en días, horas y minutos
  //   var partes = tiempo.split(' ');
  //   var dias = parseInt(partes[0]);
  //   var horas = parseInt(partes[1]);
  //   var minutos = parseInt(partes[2]);

  //   // Calcular el total de segundos
  //   var segundosTotales = (dias * 24 * 60 * 60) + (horas * 60 * 60) + (minutos * 60);

  //   return segundosTotales;
  // }

  return (
    <div className="z-10 fixed left-[-10px] right-[-10px] bottom-[-10px] top-[-10px]  bg-bgModal flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white w-2/4 h-2/4 rounded-lg p-5 items-center justify-end">
        <h1>Seguimiento de tiempo</h1>
        <div className="mt-2">
          <label htmlFor="titleDesc" className="block text-sm font-medium leading-6">
            Tiempo empleado
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="title"
              id="titleDesc"
              autoComplete="given-name"
              className="px-3 block w-2/5 rounded-md border-0 py-1.5 text-slate-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-fontPlaceholder focus:ring-2 focus:ring-inset focus:ring-inoutRing sm:text-sm sm:leading-6"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="text-xs flex flex-col ">
            <p>Usa este formato: 2w 4d 6h 45m</p>
            <p>w = semanas</p>
            <p>d = días</p>
            <p>h = horas</p>
            <p>m = minutos</p>
          </div>
        </div>
        <div className="items-center my-2">
          <button
            className="middle none center mr-3 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 py-2 px-4 font-sans text-xs font-semibold uppercase text-white shadow-md shadow-indigo-500/20 transition-all hover:shadow-lg hover:shadow-indigo-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true"
          >
            Guardar
          </button>
          <button
            className="middle none center rounded-lg py-2 px-4 font-sans text-xs font-semibold uppercase text-buttonBg transition-all hover:bg-indigo-500/10 active:bg-indigo-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-dark="true"
          >
            CANCELAR
          </button>
        </div>
      </form>
    </div>
  )
}

export default Worklog;