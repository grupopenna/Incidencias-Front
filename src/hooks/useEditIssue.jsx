import { useDispatch, useSelector } from "react-redux"
import { parseTextToJiraFormatt } from "../utils"
import { editDescription, getIssueByKey, postComments, deleteAttachments, postAttachments } from '../redux/actions'
import { useContext, useRef } from "react"
import { GlobalContext } from "../context"
import Swal from 'sweetalert2';


 const useEditIssue = ({ setLoader, issue, file, setFile }) => {
    const dispatch = useDispatch()
    const { setIsLoading } = useContext(GlobalContext)

    // ref para el editor
    const viewUpdateRef = useRef(null)
    const editorRef = useRef(null)
  
    const { jiraAccountId } = useSelector(state => state.user)
  

    const handleEditDesc = async (setEditMode) => {
        setLoader(true)
        const newValue = viewUpdateRef.current.getMarkdown()
        await editDescription(issue.key, parseTextToJiraFormatt(newValue))(dispatch)
        await getIssueByKey(issue.key)(dispatch)
        setLoader(false)
        setEditMode(false)
    }
    

    const sendNewComment = () => {
        setIsLoading(true)
        const descripcion = editorRef.current.getMarkdown()
        dispatch(postComments(parseTextToJiraFormatt(descripcion), issue.key, jiraAccountId))
        setIsLoading(false)
        editorRef.current.reset()
      }
    
      const deleteAttachmentsView = (id) => {
        Swal.fire({
          title: "Seguro deseá eliminar este adjunto?",
          showDenyButton: true,
          confirmButtonText: "ACEPTAR",
          denyButtonText: `CANCELAR`
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(deleteAttachments(issue.key, id))
          }
        });
      }

      const handlerAttachfiles = async () => {
        setIsLoading(true)
        await postAttachments(file, issue.key)(dispatch)
        setFile([])
        setIsLoading(false)
      }
    

  return {
    handleEditDesc,
    sendNewComment,
    deleteAttachmentsView,
    handlerAttachfiles,
    viewUpdateRef,
    editorRef
  }
}


export default useEditIssue