import { ATTACHABLE_COLUMNS, WRITABLE_COLUMS } from '../../const.js'
import { Badge } from '@tremor/react'
import { clientName, commentTime, parseTextToJiraFormatt, parseTextToMarkdown } from '../../utils/index.js'
import { IconFiles, SimpleArrowUp, TrashIcon } from '../Icons.jsx'
import { postAttachments, getIssueByKey, deleteAttachments, editDescription, postComments, getCommentIssues } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { Viewer, Editor as TuiEditor } from '../Editor/index.ts'
import { WithoutPhoto } from '../Icon.jsx'
import AdjuntarArchivos from '../adjuntarArchivos/AdjuntarArchivos.jsx'
import Button from '../Button/index.jsx'
import Swal from 'sweetalert2';
import { useContext } from 'react'
import { GlobalContext } from '../../context/index.jsx'


const ViewerView = ({ description }) => {
  return description
    ? <Viewer initialValue={parseTextToMarkdown(description)} />
    : <p className='text-slate-500'>Editar descripcion</p>
}

const SearchIssue = () => {
  const issue = useSelector(state => state.issueByKey)
  const [editMode, setEditMode] = useState(false)
  const [openEditor, setOpenEditor] = useState(false)
  const [descriptionLoading,setDescriptionLoadin] = useState(false)
  const [file, setFile] = useState([]);
  const [allAttachment, setAllAttachment] = useState([])
  const [verRegistro, setVerRegistro] = useState(false)
  const [imageView, setImageView] = useState('')
  const [openImage, setOpenImage] = useState(false)
  const {isLoading, setIsLoading} = useContext(GlobalContext)

  const { jiraAccountId } = useSelector(state => state.user)
  const issueError = useSelector(state => state.issueByKeyError)
  const AllComments = useSelector(state => state.commentIssuesById)

  const dispatch = useDispatch()
  const viewUpdateRef = useRef(null)
  const editorRef = useRef(null)

  const HandlerAttachfiles = async () => {
    setIsLoading(true)
    await postAttachments(file, issue.key)(dispatch)
    setFile([])
    setIsLoading(false)
    Object.keys(issue).length > 0 && setAllAttachment(issue.fields.attachment)
  }

  const handleEditDesc = async () => {
    setDescriptionLoadin(true)
    const newValue = viewUpdateRef.current.getMarkdown()
    await editDescription(issue.key, parseTextToJiraFormatt(newValue))(dispatch)
    await getIssueByKey(issue.key)(dispatch)
    setDescriptionLoadin(false)
    setEditMode(false)
  }

  const deleteAttachmentsView = (key, id) => {
    Swal.fire({
      title: "Seguro deseá eliminar este adjunto?",
      showDenyButton: true,
      confirmButtonText: "ACEPTAR",
      denyButtonText: `CANCELAR`
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteAttachments(key, id))
        setAllAttachment(allAttachment.filter(at => at.id !== id))
      }
    });
  }

  const sendNewComment = (key) => {
    setIsLoading(true)
    const descripcion = editorRef.current.getMarkdown()
    dispatch(postComments(parseTextToJiraFormatt(descripcion), key, jiraAccountId))
    setIsLoading(false)
    editorRef.current.reset()
  }

  useEffect(() => {
    if (issue !== undefined) {
        setIsLoading(false)
        getCommentIssues(issue.key)(dispatch)
    }
  }, [issue])


  if (issueError) {
    return <div className='w-full h-[500px] flex justify-center items-center'> 
          <h2 className='text-4xl text-white font-bold'>Ups!, incidencia no encontrada</h2>
      </div>
  }

  if (isLoading) {
    return <div className='w-7 h-7 m-auto rounded-full border-2 border-l-transparent animate-spin'/>
  }

  return (
    <section className="w-full  flex items-center flex-col mb-12">
        <article className='w-[60%] h-[700px] bg-white flex flex-col mt-4  p-5'>
        <header className='w-full p-1 mb-2'>
        <p className='flex items-center gap-2'>
            <img src={issue?.fields?.issuetype?.iconUrl} alt="Imagen del icono del proyecto de jira" className="w-4 h-4" />
            <span>{issue?.key}</span>
          </p>
        </header>
          <main className='flex overflow-auto'>
          <section className='w-1/2 overflow-y-auto p-2'>
             <header>
                 <h1 className='text-xl font-semibold mt-4'>{issue?.fields.summary}</h1>
             </header>
             <div className='w-full mb-2'>
                <p className='my-1 p-1 text-slate-700'>Descripción</p>
                {Object.keys(issue).length > 0 && (
                  <>
                    {ATTACHABLE_COLUMNS.includes(issue.fields.status.name.toLowerCase()) &&
                      <>
                        {WRITABLE_COLUMS.includes(issue.fields.status.name.toLowerCase()) ?
                          <section
                            onClick={() => setEditMode(true)}
                            className={`w-full p-2 z-50 ${!editMode ? 'hover:bg-slate-200' : ''} rounded-sm cursor-text`}>
                            {editMode ?
                              <>
                                <TuiEditor markdownRef={viewUpdateRef} initialValue={parseTextToMarkdown(issue.fields.description)} />

                              </>
                              :
                              <ViewerView description={issue.fields.description} />
                            }
                          </section>
                          :
                          <ViewerView description={issue.fields.description} />
                        }
                      </>
                    }

                    {editMode && <div className='flex gap-3 p-2'>
                      <Button  onClick={handleEditDesc} loader={descriptionLoading} Label={'Guardar'}/>
                      <button
                        type='button'
                        onClick={() => setEditMode(false)}
                        className='bg-slate-300 z-50 py-2 px-4 mt-4 hover:bg-slate-300/80'>Cancelar
                      </button>
                    </div>}
                    <AdjuntarArchivos file={file} setFile={setFile} Attachfiles={HandlerAttachfiles}  />

                    {issue.fields.attachment.length > 0 ?
                      <div className='mt-6'>
                        {issue.fields.attachment?.map((el, i) =>
                          el.mimeType === "image/png" ?
                            <div key={i} className='border-4 relative w-56 m-1'>
                              <button onClick={() => deleteAttachmentsView(issue.key, el.id)} className='bg-red-500 text-white flex justify-center items-center absolute top-0 right-0 h-6 w-6 p-0.5 rounded-full'><TrashIcon /></button>
                              <button className='border-2 overflow-auto' key={i} onClick={() => { setOpenImage(true), setImageView(el.content) }}>
                                <img
                                  className="w-56 h-48"
                                  src={el.content}
                                  alt={`persona asignada ${el.author.displayName}`}
                                  aria-label={`persona asignada ${el.author.displayName}`} />
                              </button>
                            </div>
                            :
                            <div key={i} className='border-4 relative w-48 m-1'>
                              <button onClick={() => deleteAttachmentsView(issue.key, el.id)} className='bg-red-500 text-white flex justify-center items-center absolute top-0 right-0 h-6 w-6 p-0.5 rounded-full'><TrashIcon /></button>
                              <a href={el.content} key={i} >
                                <button className='border-2 overflow-auto w-full flex flex-col items-center m-1'>
                                  <IconFiles />
                                  <span>{el.filename}</span>
                                </button>
                              </a>
                            </div>
                        )}
                      </div> : null}
                  </>
                )}
              </div>
              <div className='mb-3'>
                <Badge size='xl' className='p-1 mb-2'>Comentarios</Badge>
                {openEditor ?
                  <>
                  <div className='flex flex-col h-52'>
                    <TuiEditor markdownRef={editorRef} height='200px'/>
                    <div className='w-full flex gap-2'>
                      <Button onClick={() => { sendNewComment(issue.key); setOpenEditor(false) }} Label={'Guardar'} />
                      <Button onClick={() => setOpenEditor(false)} variante='secondary' Label={'Cancelar'} />
                    </div>
                  </div>
                  </>
                  :
                  <button onClick={() => setOpenEditor(true)} className='border px-3 py-2 text-sm w-96 rounded-sm cursor-text text-left ml-2'>
                    <span className='text-fontPlaceholder'>Agregue detalles o comentarios</span>
                  </button>
                }
              </div>
                {AllComments.length > 0 ?
              <section className='h-64  p-2'>
                 { AllComments.map((cm, i) => (
                    <div key={i} className='flex pt-2 mb-3' >
                      <div className='mr-4'>
                        {cm.author.avatarUrls
                          ? <img
                            className="w-6 h-6"
                            src={cm.author.avatarUrls['16x16']}
                            alt={`persona asignada ${cm.author.displayName}`}
                            aria-label={`persona asignada ${cm.author.displayName}`} />
                          : <WithoutPhoto />
                        }
                      </div>
                      <div className='w-full'>
                        <div className='flex justify-between'>
                          {cm.isMention
                            ? <p className='font-bold text-base'>{clientName(cm.mentionUser)}</p>
                            : <p className='font-bold text-base'>{cm.author.displayName}</p>
                          }

                          <span className='text-black text-sm'>{commentTime(cm.updated)} </span>
                        </div>
                        {cm?.comment?.length > 1
                          && <Viewer initialValue={parseTextToMarkdown(cm.comment)} />
                        }
                      </div>
                    </div>
                  ))}
                </section>
                  :
                  isLoading && (
                    <main className='bg-white flex justify-center items-center'>
                      <div className='w-8 h-8 border-2 border-background rounded-full animate-spin border-r-transparent' />
                    </main>
                  )
                }
          </section>
          <aside className='w-1/2 h-full px-5  pb-4'>
              <div className='mb-5'>
                <p>Profesional asignado:</p>
                {issue.fields.assignee ? (
                  <div className='flex justify-between'>
                    <p className='font-bold'>{issue.fields.assignee.displayName}</p>
                    {issue?.fields?.assignee?.avatarUrls ?
                      <img
                        className="w-6 h-6"
                        src={issue?.fields?.assignee?.avatarUrls['16x16']}
                        alt={`persona asignada ${issue?.fields?.assignee?.displayName}`}
                        aria-label={`persona asignada ${issue?.fields?.assignee?.displayName}`} />
                      : <WithoutPhoto />
                    }
                  </div>) :
                  <span className='text-fontPlaceholder text-xs'>Todavia nadie se asigno esta tarea</span>
                }
              </div>
              <div className='mb-5'>
                <p>Status:</p>
                <p className='font-bold'>{issue.fields.status.name}</p>
              </div>

              {issue.fields.timetracking.timeSpent ?
                <div className='mb-5'>
                  <p>Seguimiento de tiempo:</p>
                  <div className='w-96 h-1 bg-buttonBg'></div>
                  <p className='font-bold text-buttonBg'>
                    <span className='text-fontPlaceholder'>Registrado:</span>{issue.fields.timetracking.timeSpent}
                  </p>
                </div>
                : null
              }

              <div className='max-h-96'>
                <Badge className='p-1 mb-2'>Registro de trabajo</Badge>

                <div className='h-full'>
                  {issue.fields.worklog.worklogs.length > 0 ?
                    !verRegistro ?
                      <button onClick={() => setVerRegistro(true)} className='border-2 flex w-full justify-center'><span>{`Ver ${issue.fields.worklog.worklogs.length} registros`}</span></button>
                      : <>
                        <button onClick={() => setVerRegistro(false)} className='border-t-2 flex w-full justify-center'><span><SimpleArrowUp /></span></button>
                        {issue.fields.worklog.worklogs.map((wl, i) => (
                          <div key={i} className='flex pt-2 mb-3' >
                            <div className='mr-4'>
                              {wl.updateAuthor.avatarUrls ?
                                <img
                                  className="w-6 h-6"
                                  src={wl.updateAuthor.avatarUrls['16x16']}
                                  alt={`persona asignada ${wl.updateAuthor.displayName}`}
                                  aria-label={`persona asignada ${wl.updateAuthor.displayName}`} />
                                : <WithoutPhoto />
                              }
                            </div>
                            <div className='w-full'>
                              <div className='flex justify-between'>
                                <p className='font-bold text-base'>{wl.updateAuthor.displayName}</p>
                                <span className='text-buttonBg'><span className='text-fontPlaceholder text-sm'>registro </span>{wl.timeSpent}</span>
                                <span className='text-fontPlaceholder text-xs'>{commentTime(wl.updated)}</span>
                              </div>
                              <p>{wl.comment}</p>
                            </div>
                          </div>
                        ))}
                      </>
                    : <span className='text-fontPlaceholder text-xs'>Todavía no se ha hecho ningún registro</span>
                  }
                </div>
              </div>
            </aside>
          </main>
        </article>
    </section>
  )
}


export default SearchIssue