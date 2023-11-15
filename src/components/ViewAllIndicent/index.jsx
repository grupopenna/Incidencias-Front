/* eslint-disable react-hooks/exhaustive-deps */
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
import InProcess from '../InProcess'

const ORDER_BY = {
    ASC: 'asc',
    DESC: 'desc'
}

const colorState = {
    'green': '#19f750',       //listo
    'yellow': '#fa8907',    //en curso
    'blue-gray': '#dfff40'   //por hacer
}

function ViewAllIndicent() {
    const [order, setOrder] = useState(ORDER_BY.DESC)
    const [selectedProject, setSelectedProject] = useState('')
    const [selectedItem, setSelectedItem] = useState()
    const [isLoading, setIsloding] = useState(true)
    const [modalShow, setModalShow] = useState(false)
    const [viewInProcess, setViewInProcess] = useState(false)
    const [searchByDetail, setSearchByDetail] = useState('')

    const dispatch = useDispatch()
    const allIncients = useSelector(state => state.allIncients)
    const projects = useSelector(state => state.projects)
    const { jiraAccountId } = useSelector(state => state.user)

    const incidentOrdered = useMemo(() => {
        if (!allIncients) return []

        let mutateData = allIncients
        if (order === ORDER_BY.DESC) {
            mutateData = allIncients?.toSorted((a, b) => {
                return new Date(b?.fields.created) - new Date(a?.fields.created)
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
            await getAllIssues(jiraAccountId)(dispatch)
            await getProjects()(dispatch)
            setIsloding(false)
        })()

    }, [])

    if (isLoading) {
        return <Loader />
    }

    return (
        <section className="flex justify-center flex-col mx-20 mt-10 items-center">
            {modalShow && <Modal setModalShow={setModalShow} itemSelect={selectedItem} />}
            <header className='w-full flex gap-3 p-2 items-end justify-between'>
                <div className='flex gap-2 items-end justify-center'>
                    <div className=' flex flex-col gap-x-3'>
                        <label className='text-white '>
                            Filtrar por projecto
                        </label>
                        <Select disabled={viewInProcess} className='w-1/2' onValueChange={handleSelectChange} value={selectedProject}>
                            {projects?.map((project) => (
                                <SelectItem key={project.key} value={project.name}>
                                    {project.name}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                    <button 
                      onClick={() => setViewInProcess(!viewInProcess)}
                      className='px-2 py-2 rounded-md text-white bg-indigo-700'>
                        {viewInProcess ? 'Ver todas' : 'Ver en curso'}
                      </button>
                </div>

                <div className='w-1/3 flex'>
                    <TextInput onChange={handleSearchByDetail} className='p-1' role='searchbox' icon={SearchIcon} placeholder='Buscar por detalle...' />
                </div>
            </header>
            { viewInProcess && <InProcess />}
            { !viewInProcess && <Table className='w-full'>
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
                                    <img className='w-5 h-6' src={inciden?.fields.issuetype.iconUrl} alt={inciden?.key} />
                                </div>
                            </TableCell>
                            <TableCell className='text-center'>{inciden?.fields.project.name}</TableCell>
                            <TableCell className='text-center'>{inciden?.key}</TableCell>
                            <TableCell className='text-center'>{inciden?.fields.summary}</TableCell>
                            <TableCell className='text-center'>{inciden?.fields?.assignee?.displayName || <i>Sin asignar</i>}</TableCell>
                            <TableCell className='text-center'>
                                <div className='w-28 h-10 m-auto'>
                                    <p>{inciden?.fields.status.statusCategory.name}</p>
                                    <div className='h-1 rounded-sm' style={{ backgroundColor: colorState[inciden?.fields.status.statusCategory.colorName] }}></div>
                                </div>
                            </TableCell>
                            <TableCell className='text-center'>{formatCreated}</TableCell>
                            <TableCell className='text-center'>{formatUpdated}</TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>}

        </section>
    )
}

export default ViewAllIndicent