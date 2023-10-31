import { PropTypes } from 'prop-types';

const ModalDelete = ({ setDeleteIssue, item, deleteIssue }) => {

  return (
    <div className="z-10 fixed left-[-10px] right-[-10px] bottom-[-10px] top-[-10px] bg-bgModal flex justify-center items-center">
      <div className="bg-white h-2/5 w-2/5 rounded-lg p-3 flex justify-center items-center border-2">
        <div className='flex flex-col items-center'>
          <div>
            <p>¿Seguro deseas eliminar esta incidencia?</p>
          </div>
          <div className="flex items-center gap-2 my-3">
            <img src={item?.fields.issuetype?.iconUrl} alt="Imagen del icono del proyecto de jira" className="w-4 h-4" />
            <p className="text-base">{item.key}</p>
          </div>
          <div className='mt-3'>
            <button onClick={() => deleteIssue(item.key)} className='bg-buttonBg py-1 px-2 border-2 border-buttonBg text-white uppercase rounded-md mx-6 hover:bg-transparent hover:text-black'>aceptar</button>
            <button className='bg-buttonCol py-1 px-2 border-2 border-buttonCol text-white uppercase rounded-md mx-6 hover:bg-transparent hover:text-black' onClick={() => setDeleteIssue(false)} >cancelar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

ModalDelete.propTypes = {
  setDeleteIssue: PropTypes.func,
  deleteIssue: PropTypes.func,
  item: PropTypes.object
}

export default ModalDelete