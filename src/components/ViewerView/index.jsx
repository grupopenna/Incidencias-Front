import { parseTextToMarkdown } from "../../utils"
import { Viewer } from "../Editor"

const ViewerView = ({ description }) => {
    return description
      ? <Viewer initialValue={parseTextToMarkdown(description)} />
      : <p className='text-slate-500'>Editar descripcion</p>
  }

export default ViewerView
