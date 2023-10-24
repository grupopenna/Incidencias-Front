/* eslint-disable react/prop-types */
/* eslint-disable no-prototype-builtins */


const Incident = ({item}) => {
  console.log('item.fields', item.fields)
  console.log('item.fields.responsable', item.fields.assignee?.displayName == null)

  return (
    <div className="h-full w-full rounded-md bg-bgIncident mb-3 flex flex-col p-1 text-font">
        {/* key={item.fields.fields.key}
                      id={item.fields.id}
                      img={item.fields.image}
                      title={item.fields.fields.summary}
                      description={item.fields.fields.description}
                      state={item.fields.fields.status.name}
                      responsable={item.fields.fields?.assignee}
                      hsConsumidas={item.fields.fields.timetracking.timeSpent}
                      hsEstimadas={item.fields.fields.timetracking.remainingEstimate} */}
      <h2 className="text-font font-bold text-lg">{item.fields.summary}</h2>
      <p className="text-base">{item.key}</p>
      {/* <img src={item.fields.img} alt="" className="h-64 "/> */}
      <p>{item.fields.timetracking.timeSpent}</p>
      {/* <p>{item.fields.coments}</p> */}
      <div>
        <p>Responsable {item.fields.assignee?.displayName}</p>
      </div>
      {/* {item.fields.timeSpent == null ? "" : <p> {item.fields.timeSpent }</p> } */}
      {/* <p>{item.fields.process}</p>
      <p>{item.fields.priority}</p> */}
    </div>
  )
}

export default Incident;