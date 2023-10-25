import { PropTypes } from 'prop-types';
import { useState, useEffect } from 'react';
import EditorText from '../ToolEditorText/EditorText'
import { useDispatch, useSelector } from 'react-redux';
import { postComments } from '../../redux/actions/commentIssues/PostComment';
import { clearAllCommentState, getCommentIssues } from '../../redux/actions/commentIssues/getCommentIssues';

const Modal = ({ setModalShow, itemSelect }) => {
  const dispatch = useDispatch()
  const upString = /[A-Z]/g
  const AllComments = useSelector(state => state.commentIssuesById)
  const [comentarios, setComentarios] = useState([])
  const [item, setItem] = useState(null)
  const [openEditor, setOpenEditor] = useState(false)
  const [descripcion, setDescripcion] = useState('')

  useEffect(() => {
    setItem(itemSelect)
    setComentarios(AllComments.reverse())
  }, [item, AllComments.length])


  useEffect(() => {
    dispatch(getCommentIssues(itemSelect.key))
    AllComments.length > 0 && setComentarios(AllComments.reverse())
  }, [dispatch])

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
    setDescripcion('')
    dispatch(postComments(descripcion, key))
  }

  return (
    <div className="z-10 fixed left-[-10px] right-[-10px] bottom-[-10px] top-[-10px]  bg-bgModal flex justify-center items-center">
      <div className="bg-white h-4/5 w-4/5 rounded-lg p-3">
        <div className='flex justify-end'>
          <button onClick={() => { dispatch(clearAllCommentState()); setModalShow(false) }}><span className="p-1 rounded-full">X</span></button>
        </div>
        {item && (<>
          <div className='ml-5'>
            {item.key}
          </div>
          <div className='flex h-5/6'>
            {/*-------seccion--1-------- */}
            <div className='w-1/2 px-5 overflow-auto pb-4'>
              <div className='text-2xl mb-10'>
                <p>{item.fields.summary}</p>
              </div>
              <div className='mb-2 h-52 w-5/6 pr-8 overflow-auto'>
                <p>Descripción:</p>
                <p>{item.fields.description}</p>
              </div>
              <div className='mb-3'>
                Comentarios:
                {openEditor ?
                  <>
                    <EditorText setDescripcion={setDescripcion} descripcion={descripcion} />
                    <div className='mt-2'>
                      <buton onClick={() => sendNewComment(item.key)} className="bg-buttonBg p-1 rounded text-white">Guardar</buton>
                    </div>
                  </>
                  :
                  <button onClick={() => setOpenEditor(true)} className='border px-3 py-2 text-sm rounded-sm cursor-text ml-2'>
                    <span className='text-fontPlaceholder'>Agregue detalles o comentarios</span>
                  </button>
                }
              </div>
              {comentarios.length > 0 ?
                comentarios.map((cm, i) => (
                  <div key={i} className='flex pt-2 mb-3' >
                    <div className='mr-4'>
                      <span className="border-2 p-1 rounded-full">{cm.updateAuthor.displayName.match(upString)}</span>
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
                null
              }
            </div>
            {/*-------seccion--2-------- */}
            <div className='w-1/2 px-5'>
              {item.fields.assignee && (
                <div className='flex justify-between mb-10'>
                  <p>Asignado:</p>
                  <p className='font-bold'>{item.fields.assignee.displayName}</p>
                  <span className="border-2 p-1 rounded-full">{item.fields.assignee?.displayName.match(upString)}</span>
                </div>)}
              <div>
                Status: {item.fields.status.name}
              </div>
            </div>
          </div>
        </>
        )}
      </div>
    </div >
  )
}

Modal.propTypes = {
  setModalShow: PropTypes.func,
  itemSelect: PropTypes.object
}

export default Modal