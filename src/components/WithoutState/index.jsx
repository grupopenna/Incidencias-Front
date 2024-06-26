import {
    Table, 
    TableBody,
    TableHead,
    TableCell,
    TableHeaderCell,
    TableRow,
    Select,
    SelectItem
} from '@tremor/react'
import { getIssuesInProcess, getUsers } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { FormatDate } from '../../utils'
import { BOARD_STATUS, ORDER_BY } from '../../const'
import { useState } from 'react'
import { ArrowDown, ArrowUp } from '../Icon'
import { useMemo } from 'react'
import Modal from '../Modal/Modal'
import Loader from '../Loader'

const colorState = {
    'green': '#19f750',       //listo
    'yellow': '#fa8907',    //en curso
    'blue-gray': '#dfff40'   //por hacer
}

const WithoutState = () => {
   const [order, setOrder] = useState(ORDER_BY.DESC)
   const [selectedAssigne, setSelectedAssigne] = useState('')
   const [status, setStatus] = useState('')
   const [selectedItem, setSelectedItem] = useState()
   const [modalShow, setModalShow] = useState(false)
   const [isLoading, setIsLoading] = useState(true)

   const dispatch = useDispatch()
   const issues = useSelector(state => state.incidentsInProcess)
   const users = useSelector(state => state.users)


    
   const incidentOrdered = useMemo(() => {
    if (!issues) return []

    let mutateData = issues
    if (order === ORDER_BY.DESC) {
        mutateData = issues?.toSorted((a, b) => {
            return new Date(b?.fields.created) - new Date(a?.fields.created)
        })
    } else {
        mutateData = issues.toSorted((a, b) => {
            return new Date(a?.fields.created) - new Date(b?.fields.created)
        })
    }

    if (selectedAssigne !== '') {
        if (selectedAssigne === 'Sin asignar') {
            mutateData = mutateData?.filter((item) => !item?.fields?.assignee?.displayName)
        } else {
            mutateData = mutateData?.filter((item) => item?.fields?.assignee?.displayName.toLowerCase() === selectedAssigne?.toLowerCase())
        }
    }
    
    if (status !== '') {
        console.log({ status })
        mutateData = mutateData?.filter((item) => item?.fields.status.name?.toLowerCase() === status)
    }

    return mutateData

}, [order, issues, selectedAssigne, status])

   useEffect(() => {
     getUsers()(dispatch)
   }, [])

   useEffect(() => {

    (async () => {
        const jql = 'status in ("Priorizado", "Sin Priorizar")'
        await getIssuesInProcess(jql)(dispatch)
        setIsLoading(false)
    })()
    }, [])

    const handleOrderTable = () => {
        if (order === ORDER_BY.DESC) {
            setOrder(ORDER_BY.ASC)
        } else {
            setOrder(ORDER_BY.DESC)
        }
    }

    const handleShowDetails = (index) => {
        setSelectedItem(incidentOrdered[index])
        setModalShow(true)
    }
  return (
    <section className="w-full h-full flex flex-col items-center justify-center">
         {modalShow && <Modal setModalShow={setModalShow} itemSelect={selectedItem} />}
         <header className='w-11/12 m-auto p-4 flex'>
            <div className='w-full flex gap-x-4 p-2 items-center justify-center'>
                
                <label className='text-white'>Filtrar por: 
                        </label>
                    <Select className='w-24' placeholder='Responsable' value={selectedAssigne} onValueChange={setSelectedAssigne}>
                        {users?.map((user) => (
                            <SelectItem key={user.accountId} value={user.displayName}>{user.displayName}</SelectItem>
                        ))}
                        <SelectItem>Sin asignar</SelectItem>
                    </Select>
                <Select className='w-24' placeholder='Estado' value={status} onValueChange={setStatus}>
                    {Object.values(BOARD_STATUS).map((status, index) => (
                        <SelectItem key={index} value={status}>{status}</SelectItem>
                    ))}
                </Select>
            </div>
         </header>
         <main className='w-11/12 flex flex-col items-center justify-center'>
            {isLoading && <Loader />}
            { incidentOrdered?.length > 0 && !isLoading && <Table className='w-full'>
                <TableHead>
                    <TableRow>
                        <TableHeaderCell className='text-center'>T</TableHeaderCell>
                        <TableHeaderCell className='text-center'>Proyecto</TableHeaderCell>
                        <TableHeaderCell className='text-center'>Clave</TableHeaderCell>
                        <TableHeaderCell className='text-center'>Resumen</TableHeaderCell>
                        <TableHeaderCell className='text-center'>Responsable</TableHeaderCell>
                        <TableHeaderCell className='text-center'>Estado</TableHeaderCell>
                        <TableHeaderCell>
                            <div
                                onClick={handleOrderTable}
                                className='flex justify-center items-center p-2 cursor-pointer'>Creada
                                {order === ORDER_BY.DESC ? <ArrowDown /> : <ArrowUp/>}
                            </div>
                        </TableHeaderCell>
                        <TableHeaderCell>Actualizada</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {incidentOrdered?.map((issue, index) => {
                         const formatCreated = FormatDate(new Date(issue?.fields.created))
                         const formatUpdated = FormatDate(new Date(issue?.fields.updated))
 
                         return <TableRow
                             onClick={() => handleShowDetails(index)}
                             key={issue.id}
                             className='hover:bg-white/30'>
                             <TableCell className='text-cente'>
                                 <div className='flex items-center justify-center m-auto p-2'>
                                     <img className='w-5 h-6' src={issue?.fields.issuetype.iconUrl} alt={issue?.key} />
                                 </div>
                             </TableCell>
                             <TableCell className='text-center'>{issue?.fields.project.name}</TableCell>
                             <TableCell className='text-center'>{issue?.key}</TableCell>
                             <TableCell className='text-center'>{issue?.fields.summary}</TableCell>
                             <TableCell className='text-center'>{issue?.fields?.assignee?.displayName || <i>Sin asignar</i>}</TableCell>
                             <TableCell className='text-center'>
                                 <div className='w-28 h-10 m-auto'>
                                     <p>{issue?.fields.status.statusCategory.name}</p>
                                     <div className='h-1 rounded-sm' style={{ backgroundColor: colorState[issue?.fields.status.statusCategory.colorName] }}></div>
                                 </div>
                             </TableCell>
                             <TableCell className='text-center'>{formatCreated}</TableCell>
                             <TableCell className='text-center'>{formatUpdated}</TableCell>
                         </TableRow>
                
                    })}
                </TableBody>
            </Table>}

            {incidentOrdered?.length === 0 && <h2 className='text-white text-2xl mt-12'>Sin resultados</h2>}
         </main>
    </section>
  )
}


export default WithoutState