/* eslint-disable react/prop-types */
/* eslint-disable no-prototype-builtins */

import { WithoutPhoto } from "../Icon";


const Incident = ({ item, style, innerRef, ...rest }) => {

  return (
    <div ref={innerRef} className="h-40 w-full my-2 mx-1 rounded-md bg-bgIncident flex justify-end items-center flex-col text-font" 
      {...rest} 
      style={{
        ...style
        }}>
      <div className="w-full">
        <p className="text-font font-bold text-lg">{item.fields.summary}</p>
      </div>
      <p>{item.fields.timetracking?.timeSpent}</p>
      <div className="w-full h-1/2 items-end justify-between p-2 flex">
          <div className="flex items-center gap-2">
            <img src={item?.fields.issuetype?.iconUrl} alt="Imagen del icono del proyecto de jira" className="w-4 h-4" />
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
    </div>
  )
}

export default Incident;