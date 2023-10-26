/* eslint-disable react/prop-types */
/* eslint-disable no-prototype-builtins */

import { WithoutPhoto } from "../Icon";


const Incident = ({ item, style, innerRef, ...rest }) => {
  //console.log('item.fields.responsable', item.fields.assignee?.displayName == null)

  return (
    <div 
      ref={innerRef}
      className="h-40 w-64 rounded-md bg-bgIncident mb-3 flex justify-end items-center flex-col p-1 text-font" 
      {...rest} 
      style={{
        ...style,
        background: 'none',
        }}>
      {/* key={item.fields.fields.key}
                      id={item.fields.id}
                      img={item.fields.image}
                      title={item.fields.fields.summary}
                      description={item.fields.fields.description}
                      state={item.fields.fields.status.name}
                      responsable={item.fields.fields?.assignee}
                      hsConsumidas={item.fields.fields.timetracking.timeSpent}
                      hsEstimadas={item.fields.fields.timetracking.remainingEstimate} */}
      <div className="w-full">

      <p className="text-font font-bold text-lg">{item.fields.summary}</p>
      </div>
      {/* <img src={item.fields.img} alt="" className="h-64 "/> */}
      <p>{item.fields.timetracking.timeSpent}</p>
      {/* <p>{item.fields.coments}</p> */}
      <div className="w-full h-1/2 items-end justify-between p-2 flex">
       <div className="flex items-center gap-2">
         <img src={item?.fields.issuetype.iconUrl} alt="Imagen del icono del proyecto de jira" className="w-4 h-4" />
         <p className="text-base">{item.key}</p>
       </div>
       { item?.fields?.assignee?.avatarUrls ?
       <img 
        className="w-6 h-6" 
        src={item?.fields?.assignee?.avatarUrls['16x16']} 
        alt={`persona asignada ${item?.fields?.assignee?.displayName}`} 
        aria-label={`persona asignada ${item?.fields?.assignee?.displayName}`}/>
        : <WithoutPhoto />
      }

      </div>
      {/* {item.fields.timeSpent == null ? "" : <p> {item.fields.timeSpent }</p> } */}
      {/* <p>{item.fields.process}</p>
      <p>{item.fields.priority}</p> */}
    </div>
  )
}

export default Incident;