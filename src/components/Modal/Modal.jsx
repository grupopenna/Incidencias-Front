import { clearAllCommentState, getCommentIssues, postComments, editDescription } from '../../redux/actions'
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { useState, useEffect } from 'react';
import { AdjIcon, IconFiles, SimpleArrowUp, TrashIcon } from '../Icons';
import '@toast-ui/editor/dist/toastui-editor.css';
import { WithoutPhoto } from '../Icon';
import ImgModal from '../ImgModal/ImgModal';
import ModalDelete from './ModalDelete';
import { deleteIssues } from '../../redux/actions/issue/deleteIssue';
import { Viewer, Editor as TuiEditor } from '../Editor/index';

import '@toast-ui/editor/dist/toastui-editor.css';
import { parseTextToMarkdown } from '../../utils/index'


const ALLOW_COLUMS_TO_EDIT = ['priorizado', 'sin priorizar']

/* const DescriptionField = ({
  editMode,
  description,
  editorRef,
  onClick,
  currentColum
}) => {

  const isAllowToEdit = ALLOW_COLUMS_TO_EDIT.includes(currentColum.toLowerCase())

  if (!isAllowToEdit || !editMode) {
    return description
      ? <Viewer initialValue={parseTextToMarkdown(description)} />
      : <p className='text-slate-500'>Editar descripcion</p>
  }

  return <>
    <TuiEditor markdownRef={editorRef} initialValue={parseTextToMarkdown(description)} />
    <button onClick={() => onClick()} className='bg-buttonBg py-2 mt-4 rounded-sm text-white px-4 hover:bg-buttonBg/80'>Guardar</button>
  </>
} */

const ActionDeleteIncident = ({ currentColum, setModalDeleteIssue }) => {
  const isAllowToEdit = ALLOW_COLUMS_TO_EDIT.includes(currentColum.toLowerCase())
  if (isAllowToEdit) {
    return (
      <div className='pr-5 mt-4 flex justify-end'>
        <button onClick={() => setModalDeleteIssue(true)} className='text-red-500 flex justify-end rounded-full p-1 border-2 border-red-500 hover:text-white hover:bg-red-500'>
          <TrashIcon />
        </button>
      </div>
    )
  }
}

const ViewerView = ({ description }) => {
  return description
    ? <Viewer initialValue={parseTextToMarkdown(description)} />
    : <p className='text-slate-500'>Editar descripcion</p>
}

const Modal = ({ setModalShow, itemSelect }) => {
  const dispatch = useDispatch()
  const AllComments = useSelector(state => state.commentIssuesById)
  const [comentarios, setComentarios] = useState([])
  const [item, setItem] = useState(null)
  const [openEditor, setOpenEditor] = useState(false)
  const [verRegistro, setVerRegistro] = useState(false)
  const [loading, setLoading] = useState(true)
  const [openImage, setOpenImage] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [imageView, setImageView] = useState('')
  const [modalDeleteIssue, setModalDeleteIssue] = useState(false)

  /**
   * 
   * Cuando se use el componente TuiEditor es necesario pasar una referencia usando useRef() por props
   * Esto le asignara la instancia del editor para luego poder user el metodo getMarkdown() para recuperar el contenido del editor.
   */
  const editorRef = useRef(null)
  const viewUpdateRef = useRef(null)

  useEffect(() => {
    setItem(itemSelect)
    setComentarios(AllComments.reverse())
    setTimeout(() => { setLoading(false) }, 2000)
  }, [item, AllComments.length])

  useEffect(() => {
    dispatch(getCommentIssues(itemSelect.key))
    AllComments.length > 0 && setComentarios(AllComments.reverse())
  }, [dispatch])


  /**
   * Crear una funcion que formatee lo que devuelve el editor a un formato que jira entienda.
   */
  const handleEditDesc = async () => {
    setLoading(true)
    const newValue = viewUpdateRef.current.getMarkdown().split('\n')
    const formatValue = newValue.join('\\n\\n')
    await editDescription(item.key, formatValue)(dispatch)
    setLoading(false)
    setEditMode(false)
  }

  const commentTime = (data) => {
    let fechaAntigua = new Date(data);
    let fechaActual = new Date();
    let diferenciaEnMilisegundos = fechaActual - fechaAntigua;

    let minutos = Math.floor(diferenciaEnMilisegundos / (1000 * 60));
    let horas = Math.floor(minutos / 60);
    let dias = Math.floor(horas / 24);

    return dias > 0 ? `Hace ${dias} dias` :
      horas > 0 ? `Hace ${horas} horas` :
        minutos > 1 ? `Hace ${minutos} minutos` :
          'Hace 1 minuto'
  }

  const sendNewComment = (key) => {
    setLoading(true)
    setTimeout(() => { setLoading(false) }, 2500)
    const descripcion = editorRef.current.getMarkdown()
    dispatch(postComments(descripcion, key))
    editorRef.current.reset()
  }

  const deleteInfoIssue = (key) => {
    dispatch(deleteIssues(key))
    setModalDeleteIssue(false)
    setModalShow(false)
  }

  return (
    <div className="z-10 fixed left-[-10px] right-[-10px] bottom-[-10px] top-[-10px]  bg-bgModal flex justify-center items-center">
      <div className="bg-white h-4/5 w-4/5 rounded-lg p-3">
        {openImage && <ImgModal openImageState={setOpenImage} imageView={imageView} />}
        {modalDeleteIssue && <ModalDelete setDeleteIssue={setModalDeleteIssue} item={itemSelect} deleteIssue={deleteInfoIssue} />}
        <div className='flex justify-end'>
          <button onClick={() => { dispatch(clearAllCommentState()); setModalShow(false) }}><span className="p-1 rounded-full">X</span></button>
        </div>
        {item && (<>
          <div className="flex items-center gap-2">
            <img src={item?.fields.issuetype?.iconUrl} alt="Imagen del icono del proyecto de jira" className="w-4 h-4" />
            <p className="text-base">{item.key}</p>
          </div>
          <div className='flex h-5/6'>
            {/*-------seccion--1-------- */}
            <div className='w-1/2 h-full px-5 overflow-auto pb-4'>
              <div className='text-2xl mb-5 '>
                <p>{item.fields.summary}</p>
              </div>
              <div className='my-1 w-8 h-8 bg-bgCard rounded-lg '>
              <AdjIcon/>
            </div>
              <div className='my-5 max-h-80 w-full pr-3 overflow-auto'>
                <p>Descripción:</p>
                {ALLOW_COLUMS_TO_EDIT.includes(item.fields.status.name.toLowerCase()) ?
                  <section
                    onClick={() => setEditMode(true)}
                    className={`w-full p-2 z-50 ${!editMode ? 'hover:bg-slate-200' : ''} rounded-sm cursor-text`}>
                    {editMode ?
                      <TuiEditor markdownRef={viewUpdateRef} initialValue={parseTextToMarkdown(item.fields.description)} />
                      :
                      <ViewerView description={item.fields.description} />
                    }
                  </section>
                  :
                  <ViewerView description={item.fields.description} />
                }

                {editMode && <div className='flex gap-3 p-4'>
                  <button onClick={handleEditDesc} className='bg-buttonBg py-2 mt-4 rounded-sm text-white px-4 hover:bg-buttonBg/80'>
                    {loading
                      ? <div className='w-6 animate-spin border-2  border-white border-l-transparent rounded-full h-6' />
                      : 'Guardar'
                    }
                  </button>
                  <button
                    type='button'
                    onClick={() => setEditMode(false)}
                    className='bg-slate-300 z-50 py-2 px-4 mt-4 hover:bg-slate-300/80'>Cancelar
                  </button>
                </div>}
                {item.fields.attachment.length > 0 ?
                  <div className='mt-6'>
                    {item.fields.attachment.map((el, i) =>
                      el.mimeType === "image/png" ?
                        <button className='mr-3 border-2' key={i} onClick={() => { setOpenImage(true), setImageView(el.content) }}>
                          <img
                            className="w-64 h-48"
                            src={el.content}
                            alt={`persona asignada ${el.author.displayName}`}
                            aria-label={`persona asignada ${el.author.displayName}`} />
                        </button>
                        :
                        <a href={el.content} key={i} >
                          <button className='border-2 overflow-auto w-48 flex flex-col items-center m-1'>
                            <IconFiles />
                            <span>{el.filename}</span>
                          </button>
                        </a>
                    )}
                  </div> : null}
              </div>
              <div className='mb-3'>
                <p>Comentarios:</p>
                {openEditor ?
                  <>
                    <TuiEditor markdownRef={editorRef} />
                    <div className='mt-2'>
                      <button onClick={() => sendNewComment(item.key)} className="bg-buttonBg p-1 rounded text-white">Guardar</button>
                    </div>
                  </>
                  :
                  <button onClick={() => setOpenEditor(true)} className='border px-3 py-2 text-sm w-96 rounded-sm cursor-text text-left ml-2'>
                    <span className='text-fontPlaceholder'>Agregue detalles o comentarios</span>
                  </button>
                }
              </div>
              {comentarios.length > 0 ?
                comentarios.map((cm, i) => (
                  <div key={i} className='flex pt-2 mb-3' >
                    <div className='mr-4'>
                      {cm.updateAuthor.avatarUrls ?
                        <img
                          className="w-6 h-6"
                          src={cm.updateAuthor.avatarUrls['16x16']}
                          alt={`persona asignada ${cm.updateAuthor.displayName}`}
                          aria-label={`persona asignada ${cm.updateAuthor.displayName}`} />
                        : <WithoutPhoto />
                      }
                    </div>
                    <div className='w-full'>
                      <div className='flex justify-between'>
                        <p className='font-bold text-base'>{cm.updateAuthor.displayName}</p>
                        <span className='text-fontPlaceholder text-sm'>{commentTime(cm.updated)}</span>
                      </div>
                      <p>{cm.body}</p>
                    </div>
                  </div>
                ))
                :
                loading && (
                  <main className='bg-white flex justify-center items-center'>
                    <div className='w-8 h-8 border-2 border-background rounded-full animate-spin border-r-transparent' />
                  </main>
                )
              }
            </div>
            {/*-------seccion--2-------- */}
            <div className='w-1/2 h-full px-5 overflow-auto pb-4'>
              <div className='mb-5'>
                <p>Profesional asignado:</p>
                {item.fields.assignee ? (
                  <div className='flex justify-between'>
                    <p className='font-bold'>{item.fields.assignee.displayName}</p>
                    {item?.fields?.assignee?.avatarUrls ?
                      <img
                        className="w-6 h-6"
                        src={item?.fields?.assignee?.avatarUrls['16x16']}
                        alt={`persona asignada ${item?.fields?.assignee?.displayName}`}
                        aria-label={`persona asignada ${item?.fields?.assignee?.displayName}`} />
                      : <WithoutPhoto />
                    }
                  </div>) :
                  <span className='text-fontPlaceholder text-xs'>Todavia nadie se asigno esta tarea</span>
                }
              </div>
              <div className='mb-5'>
                <p>Status:</p>
                <p className='font-bold'>{item.fields.status.name}</p>
              </div>

              {item.fields.timetracking.timeSpent ?
                <div className='mb-5'>
                  <p>Seguimiento de tiempo:</p>
                  <div className='w-96 h-1 bg-buttonBg'></div>
                  <p className='font-bold text-buttonBg'><span className='text-fontPlaceholder'>Registrado:</span>{item.fields.timetracking.timeSpent}</p>
                </div>
                : null}
              <div className='max-h-96'>
                <p>Registro de trabajo:</p>

                <div className='h-full overflow-auto'>
                  {item.fields.worklog.worklogs.length > 0 ?
                    !verRegistro ?
                      <button onClick={() => setVerRegistro(true)} className='border-2 flex w-full justify-center'><span>{`Ver ${item.fields.worklog.worklogs.length} registros`}</span></button>
                      : <>
                        <button onClick={() => setVerRegistro(false)} className='border-t-2 flex w-full justify-center'><span><SimpleArrowUp /></span></button>
                        {item.fields.worklog.worklogs.map((wl, i) => (
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
            </div>
          </div>
        </>
        )}
        <ActionDeleteIncident currentColum={itemSelect.fields.status.name} setModalDeleteIssue={setModalDeleteIssue} />
      </div>
    </div >
  )
}

Modal.propTypes = {
  setModalShow: PropTypes.func,
  itemSelect: PropTypes.object
}

export default Modal