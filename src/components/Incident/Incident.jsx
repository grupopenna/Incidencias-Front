const Incident = (prop) => {
  return (
    <div className="h-fit mb-10 flex flex-col">
      <div className="h-fit mb-4">
        <h2 className="font-bold text-2xl">{prop.title}</h2>
      </div>
      {/* <img src={prop.img} alt="" className="h-64 "/> */}
      <p>{prop.description}</p>
      {/* <p>{prop.state}</p> */}
      {/* <p>{prop.coments}</p> */}
      <div>
        {/* {prop.responsable && prop.responsable} */}
      </div>
      {/* <p>Tiempo invertido: {prop.hsConsumidas}</p>
      <p>Tiempo estimado: {prop.hsEstimadas}</p>
      <p>{prop.process}</p>
      <p>{prop.priority}</p> */}
    </div>
  )
}

export default Incident;