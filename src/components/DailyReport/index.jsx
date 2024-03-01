/* eslint-disable react-hooks/exhaustive-deps */
 import 
 { Badge,
  BarChart,
  Card,
  DateRangePicker, 
  DateRangePickerItem,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react'
import { CrossIcon } from '../Icon'
import { es } from 'date-fns/locale'
import { formatDateWorklog, getTime, sliceContentLenght } from '../../utils'
import { getWorklog, getUsers } from '../../redux/actions'
import { Link } from 'react-router-dom'
import { AREAS, STATU_COLOR } from '../../const'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo, useState } from 'react'
import {sub, startOfToday} from 'date-fns'
import Loader from '../Loader'
import ModalText from '../ModalText'



const URL_JIRA = {
  [AREAS.SISTEMAS]: (key) => `https://gpenna.atlassian.net/browse/${key}`,
  [AREAS.ADM]: (key) => `https://gpennaadministracion.atlassian.net/jira/software/projects/KAN/boards/1?selectedIssue=${key}`
}


const customTooltip = ({ payload, active }) => {
  if (!active || !payload) return null;

  return (
    <div className="w-56 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border">
      {payload.map((category, idx) => (
        <div key={idx} className="flex flex-1 space-x-2.5">
          <div className={`w-1 flex flex-col bg-${category.color}-500 rounded`} />
          <div className="space-y-1">
            <p className="text-tremor-content">{category.payload.date}</p>
            <p className="font-medium text-tremor-content-emphasis">{category.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};


const DailyReport = () => {
  const [date, setDate] = useState({
    from: sub(startOfToday(), { days: 7 }),
    to: new Date()
  })
  const [worker, setWorker] = useState('')
  const [selectedText, setSelectedText] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [ selectedDate, setSelectedDate ] = useState(null)
  const [selectedArea, setSelectedArea] = useState(AREAS.SISTEMAS)
  const data = useSelector(state => state.worklogs)
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  const filteredIssue = useMemo(() => {

    if (!selectedDate) return data?.issue
    
    return data?.issue?.filter((issue) => issue.date === selectedDate.date)
  }, [selectedDate, data])

  const handleSetDate = async () => {


    if (Object.values(date).every(value => !value) || !date) {
      return 
    }
    
    setIsLoading(true)

    const fromDate = formatDateWorklog(date.from)
    const toDate =  formatDateWorklog(date.to || date.from)
    let idUser

    if (worker) {
        idUser = worker
    } else {
      const userData = JSON.parse(localStorage.getItem('userData')) 
      idUser =  userData.jiraAccountId
    }

    await getWorklog(idUser, fromDate, toDate, selectedArea)(dispatch)

    setIsLoading(false)

  }

  const showMore = (text) => {
      setSelectedText(text)
      setOpenModal(true)
  }

  const handleGetUsers = async (e) => {

    if (!e?.trim()) {
      setSelectedArea(AREAS.SISTEMAS)
    } else {
      setSelectedArea(e)
    }

    await getUsers(e)(dispatch)
  }


  useEffect(() => {
      getUsers(selectedArea)(dispatch)
  }, [])

  useEffect(() => {
    
    (async () => {
      const userData = JSON.parse(localStorage.getItem('userData')) 
      const idUser =  userData.jiraAccountId
      const fromDate = formatDateWorklog(date.from)
      const toDate =  formatDateWorklog(date.to)
      await getWorklog(idUser, fromDate, toDate)(dispatch)
      setIsLoading(false)
    })()

  }, [])

  if (isLoading) {
    return <Loader />
  }

  const getColorStatusBadge = (status) => STATU_COLOR[status] ? STATU_COLOR[status]: 'gray'

  return (
    <section className="w-full h-full flex flex-col items-center mt-20">
            <main className='w-full  justify-center p-2 flex flex-col  gap-y-4 items-center'>
                <h2 className='text-4xl text-white'>Imputacion diaria</h2>
                 <p className='text-xl text-slate-400'>Rango de fechas</p>
                 <div className='flex gap-3'>

                  <Select className='w-4' placeholder='Area' value={selectedArea} onValueChange={(e) => handleGetUsers(e)}>
                    <SelectItem value={AREAS.SISTEMAS}>Sistemas</SelectItem>
                    <SelectItem value={AREAS.ADM}>Administracion</SelectItem>
                  </Select>
                  
                  <Select className='w-4' value={worker} onValueChange={setWorker} placeholder='Responsable'>
                    {users?.map((user) => (
                      <SelectItem key={user.accountId} value={user.accountId}>
                        {user.displayName}
                      </SelectItem>
                    ))}
                  </Select>
                  <DateRangePicker 
                    value={date}
                    onValueChange={setDate}
                    locale={es}
                    maxDate={new Date()}
                    placeholder='Seleccionar rango de fecha'
                  >
                    <DateRangePickerItem key='w' value='w' from={sub(startOfToday(), { days: 7 })}>
                        Últimos 7 días
                    </DateRangePickerItem>

                    <DateRangePickerItem key='today' value='today' from={new Date()}>
                      Hoy
                    </DateRangePickerItem>
                  </DateRangePicker>

                  <button onClick={handleSetDate} className='bg-buttonBg px-4 py-2 rounded-md text-white hover:bg-buttonBg/80'>Recuperar</button>
                 </div>

                 <section className='w-full flex flex-col p-4'>
                  <BarChart 
                    data={data?.worklog}
                    colors={["blue"]}
                    categories={["horas"]}
                    showAnimation
                    index='horas'
                    yAxisWidth={48}
                    onValueChange={(v) => setSelectedDate(v)}
                    customTooltip={customTooltip}
                  />
                 </section>


                 <article className='w-full p-4 mt-4'>
                  { openModal && <ModalText>
                      <Card className='w-1/2 flex items-center justify-center flex-col p-2 py-4'>
                        <header className='w-11/12  flex justify-end'>
                          <span className='cursor-pointer' onClick={() => setOpenModal(false)}>
                            <CrossIcon />
                          </span>
                        </header>
                          <section className='w-full h-full p-4'>
                              {selectedText}
                          </section>
                      </Card>  
                    </ModalText>
                  }
                  <Card className='bg-buttonCol'>

                          <Table className='w-full'>
                              <TableHead>
                                <TableRow>
                                <TableHeaderCell className='text-center'>Responsable</TableHeaderCell>
                                <TableHeaderCell className='text-center'>Clave</TableHeaderCell>
                                <TableHeaderCell className='text-center'>Titulo</TableHeaderCell>
                                <TableHeaderCell className='text-center'>Status</TableHeaderCell>
                                <TableHeaderCell className='text-center'>Observacion</TableHeaderCell>
                                <TableHeaderCell className='text-center'>Hs</TableHeaderCell>
                                </TableRow>
                              </TableHead>
                          <TableBody className='text-center'>
                            <TableRow>
                                <TableCell>
                                    <Badge>
                                        Horas totales
                                    </Badge>
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell className='text-center'>
                                    {getTime(data?.worklog.reduce((acc, current) => acc+= current?.originalTime, 0))}
                                </TableCell>
                            </TableRow>
                            {filteredIssue?.map((item, index) => (
                              <TableRow key={index}>
                                <TableCell>{item?.worklogAuthor}</TableCell>
                                <TableCell>
                                  <Link target='_blank' to={URL_JIRA[selectedArea](item?.key)} className='underline text-blue-400'>
                                    {item?.key}
                                  </Link>
                                </TableCell>
                                <TableCell>{item?.summary}</TableCell>
                                <TableCell className='text-center'>
                                  <Badge color={getColorStatusBadge(item?.status?.toLowerCase())}>
                                    {item?.status}
                                  </Badge>
                                </TableCell>
                                <TableCell className='text-center'>
                                  { sliceContentLenght(item?.comment).endsWith('. . .') 
                                  ? <p>{sliceContentLenght(item?.comment)} <span onClick={() => showMore(item?.comment)} className='text-blue-400 cursor-pointer'>ver mas</span></p>
                                  : sliceContentLenght(item?.comment)
                                  }
                                </TableCell>
                                <TableCell className='text-center'>{item?.worklogTime}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                          </Table>
                  </Card>
                 </article>
            </main>
    </section>
  )
}

export default DailyReport
