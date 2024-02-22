// import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getIssueByKey } from './../../redux/actions/issue/getIssueByKey';
import { Badge } from '@tremor/react';

const colorStatusIssue = {
  'Validar': 'red',
  'En Proceso': 'orange',
  'Priorizado': 'yellow',
  'Validado': 'blue'
}

const BoardsCard = ({item, setModalShow}) => {

  // const [modalShow, setModalShow] = useState(false)
  const dispatch = useDispatch();

  return (
    <div  className="w-full h-fit flex ">
      <div key={item.key} className="w-full p-1 my-1 mx-1 rounded-md bg-bgIncident flex flex-col text-gray-200" >
        <p className="text-gray-400 font-bold text-sm flex">{item.fields.summary}</p>
        <p className="text-gray-400 text-sm">{item.fields.timetracking?.timeSpent}</p>
        <div className="flex flex-col">
          <div className='text-blue-400 cursor-pointer' onClick={() => { setModalShow(true); dispatch(getIssueByKey(item.key)) }}>Mas Info...</div>
          {item.fields.status === 'Priorizado' ? '' :
            <Badge
              color={colorStatusIssue[item.fields.status] ?? 'gray'}
              className=" p-1 rounded-md w-full text-sm flex">
              {item.fields.status}
            </Badge>
          }
          <p className="text-gray-400 text-sm flex">{item.fields.status.name}</p>
          <div className="flex items-center py-2 gap-1">
            <img src={item.fields.issuetype?.iconUrl} alt="Imagen del icono del proyecto de jira" className="w-4 h-4" />
            <a target="_blank" rel="noreferrer" href={`https://gpenna.atlassian.net/browse/${item.key}`} className="text-gray-400 text-sm flex">{item.key}</a>
          </div>
        </div>

        

      </div>
    </div>
  )
}

export default BoardsCard
