import {
   Table,
   TableBody,
   TableCell,
   TableRow,
   TableHead,
   TableHeaderCell,
   Badge
} from '@tremor/react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getIssuesInProcess } from '../../redux/actions'
import { FormatDate, getWorklog } from '../../utils'
import { useMemo } from 'react'

const InProcess = ({ searchByDetail }) => {
  const dispatch = useDispatch()
  const issuesInProcess = useSelector(state => state.incidentsInProcess)



  const issues = useMemo(() => {

      if (!searchByDetail) return issuesInProcess

      return issuesInProcess.filter((issue) => issue?.fields.summary?.toLowerCase().includes(searchByDetail?.toLowerCase()))
  }, [searchByDetail, issuesInProcess])


  useEffect(() => {
    (async () => {
      await getIssuesInProcess()(dispatch)
    })()
  } ,[])



  return (
    <section className='w-full h-full flex flex-col items-center mt-5 justify-center'>
        <Table className='w-full'>
            <TableHead>
                <TableRow>
                    <TableHeaderCell>Clave</TableHeaderCell>
                    <TableHeaderCell>Responsable</TableHeaderCell>
                    <TableHeaderCell>Resumen</TableHeaderCell>
                    <TableHeaderCell>Actualizada</TableHeaderCell>
                    <TableHeaderCell className='text-center'>Tiempo trabajado</TableHeaderCell>
                    <TableHeaderCell>Empresa</TableHeaderCell>
                    <TableHeaderCell>TOP</TableHeaderCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {issues?.map((issue) => (
                  <TableRow key={issue?.key} className='hover:bg-white/30'>
                    <TableCell className='text-white'>
                      <div className='flex gap-x-2 items-center'>
                        <img className='w-4 h-4' src={issue?.fields.project.avatarUrls['16x16']} alt='Logo asignado a la issue'/>
                        {issue?.key}
                      </div>
                    </TableCell>
                    <TableCell className='text-white'>{issue?.fields.assignee ? issue?.fields.assignee.displayName : <i>Sin asignar</i>}</TableCell>
                    <TableCell className='text-white'>{issue?.fields.summary}</TableCell>
                    <TableCell className='text-white'>{FormatDate(new Date(issue?.fields.updated))}</TableCell>
                    <TableCell className='text-white text-center'>
                      {getWorklog(issue?.fields.worklog.worklogs)}
                    </TableCell>

                    <TableCell>
                      {issue?.fields.customfield_10107 ? issue.fields.customfield_10107 : <i>Sin asignar</i>}
                    </TableCell>

                    <TableCell className='text-white'>{
                      issue?.fields.customfield_10106 ? <Badge>{issue?.fields.customfield_10106}</Badge>   : 'Sin top'
                     } 
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
        </Table>
    </section>
  )
}

export default InProcess
