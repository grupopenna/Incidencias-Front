import { Calendar, OwnerIcon, TagNumber } from "../Icons";

const Incident = (prop) => {

  const upString = /[A-Z]/g
  return (
    <div className="h-fit mb-5 flex flex-col bg-slate-400 px-3 rounded-md text-gray-100 hover:bg-transparent border-2 border-slate-400">
      <div className="h-fit mb-4 text-current">
        <h2 className="font-bold text-lg ">{prop.title}</h2>
      </div>
      {/* <img src={prop.img} alt="" className="h-64 "/> */}
      <p className="text-base mb-2">{prop.description}</p>
      <div className="text-right mb-1">
        <span className="border-2 p-1 rounded-full">{prop.assignee?.match(upString)}</span>
      </div>
      {/* <p>{prop.state}</p> */}
      {/* <p>{prop.coments}</p> */}

      <div className="flex mb-1 justify-between">
        <div className="flex items-center">
          {prop.state === 'Finalizada' ?
            <p className="text-sm mr-1 line-through">{prop.keyId}</p> :
            <p className="text-sm mr-1">{prop.keyId}</p>
          }
          <TagNumber />
        </div>
        <div>
          <p>{prop.state}</p>
        </div>
      </div>
      <div className="flex justify-between text-xs">
        <div className="flex">
          <OwnerIcon />
          {prop.responsable && prop.responsable}
        </div>
        <div className="flex">
          <Calendar />
          <span>{new Date(prop.created).toLocaleString("es")}</span>
        </div>
      </div>
      {/* <p>Tiempo invertido: {prop.hsConsumidas}</p>
      <p>Tiempo estimado: {prop.hsEstimadas}</p>
      <p>{prop.process}</p>
      <p>{prop.priority}</p> */}
    </div>
  )
}

export default Incident;