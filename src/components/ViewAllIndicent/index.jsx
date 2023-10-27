import { ArrowDown, ArrowUp, SearchIcon } from '../Icon'
import { FormatDate } from '../../utils'
import { getAllIssues, getProjects } from '../../redux/actions'
import { 
    Select, 
    SelectItem, 
    Table, 
    TableBody, 
    TableHeaderCell, 
    TableCell, 
    TableRow,
    TableHead,
    TextInput 
} from '@tremor/react'
import { useEffect, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../Loader'
import Modal from '../Modal/Modal'

const ORDER_BY = {
    ASC: 'asc',
    DESC: 'desc'
}

function ViewAllIndicent() {
    const [order, setOrder] = useState(ORDER_BY.DESC)
    const [selectedProject, setSelectedProject] = useState('')
    const [selectedItem, setSelectedItem] = useState()
    const [isLoading, setIsloding] = useState(true)
    const [modalShow, setModalShow] = useState(false)
    const [searchByDetail, setSearchByDetail] = useState('')

    const dispatch = useDispatch()
    const allIncients = useSelector(state => state.allIncients)
    const projects = useSelector(state => state.projects)

    const incidentOrdered = useMemo(() => {
        

        if (!allIncients) return []
        
        let mutateData = allIncients
        if (order === ORDER_BY.DESC) {
            mutateData = allIncients?.toSorted((a, b) => {
                return  new Date(b?.fields.created )- new Date(a?.fields.created) 
            }) 
        } else {
            mutateData = allIncients.toSorted((a, b) => {
                 return new Date(a?.fields.created) - new Date(b?.fields.created) 
             })
        }


        if (selectedProject !== '') {
            mutateData = mutateData?.filter((item) => item.fields.project.name === selectedProject)
        }

        if (searchByDetail !== '') {
            mutateData = mutateData?.filter((item) => item.fields.summary?.toLowerCase().includes(searchByDetail?.toLowerCase()))
        }

        return mutateData

    }, [order, allIncients, selectedProject, searchByDetail])



    const handleSearchByDetail = (event) => {
        setSearchByDetail(event.target.value)
    }

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

    const handleSelectChange = (value) => {
        setSelectedProject(value)
    }

    useEffect(() => {
        
        (async () => {
            await getAllIssues()(dispatch)
            await getProjects()(dispatch)
            setIsloding(false)
        })()

    } , [])



    if (isLoading) {
     return <Loader />
    }

    return (
        <section className="flex justify-center flex-col mx-20 mt-10 items-center">
            { modalShow && <Modal setModalShow={setModalShow} itemSelect={selectedItem}/>}
            <header className='w-full flex gap-3 p-2 items-end justify-between'>
                <div className='p-2 flex flex-col gap-2'>
                    <label className='text-white '>
                Filtrar por projecto
                    </label>
                <Select className='w-1/2' onValueChange={handleSelectChange} value={selectedProject}>
                    {projects?.map((project) => (
                    <SelectItem key={project.key} value={project.name}>
                        {project.name}
                    </SelectItem>
                    ))}
                </Select>
                </div>
                <div className='w-1/3 flex'>
                  <TextInput onChange={handleSearchByDetail} className='p-1' role='searchbox' icon={SearchIcon} placeholder='Buscar por detalle...'/>
                </div>
            </header>
            <Table  className='w-full'>
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
                            {order === ORDER_BY.DESC ? <ArrowDown /> : <ArrowUp />}
                            </div>
                        </TableHeaderCell>
                        <TableHeaderCell>Actualizada</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody className='text-white'>
                    {incidentOrdered?.map((inciden, index) => {
                        const formatCreated = FormatDate(new Date(inciden?.fields.created))
                        const formatUpdated = FormatDate(new Date(inciden?.fields.updated))

                        return <TableRow 
                            onClick={() => handleShowDetails(index)}
                            key={index} 
                            className='hover:bg-white/30'>
                            <TableCell className='text-cente'>
                                <div className='flex items-center justify-center m-auto p-2'>
                                  <img className='w-5 h-6' src={inciden?.fields.issuetype.iconUrl} alt={inciden?.key}/>
                                </div>
                            </TableCell>
                            <TableCell className='text-center'>{inciden?.fields.project.name}</TableCell>
                            <TableCell className='text-center'>{inciden?.key}</TableCell>
                            <TableCell className='text-center'>{inciden?.fields.summary}</TableCell>
                            <TableCell className='text-center'>{inciden?.fields?.assignee?.displayName || <i>Sin asignar</i>}</TableCell>
                            <TableCell className='text-center'>
                                <div className='w-28 h-10 m-auto flex justify-center items-center' style={{ backgroundColor: inciden?.fields.status.statusCategory.colorName ?? 'gray', opacity: '90%' }}>
                                <span style={{ backgroundColor: inciden?.fields.status.statusCategory.colorName ?? 'gray' }}>{inciden?.fields.status.statusCategory.name}</span>
                                </div>
                            </TableCell>
                            <TableCell className='text-center'>{formatCreated}</TableCell>
                            <TableCell className='text-center'>{formatUpdated}</TableCell>
                        </TableRow>
})}
                </TableBody>
            </Table>
        </section>
    )
}

export default ViewAllIndicent