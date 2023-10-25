import { useState } from "react";
import { issuePost } from "../../redux/actions/issue/issuePost";
import { useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import EditorText from "../ToolEditorText/EditorText";

const NotifyIncidentForm = (key) => {
  const dispatch = useDispatch()
  const AllProjects = useSelector(state => state.projects)

  // const [content, setContent] = useState()

  const [titleDesc, setTitleDesc] = useState('');
  const [email, setEmail] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [errors, setErrors] = useState({ titleDesc: '', email: '', descripcion: '' });
  const location = useLocation()
  const { pathname } = location;
  // Toolbar edito
  //console.log(content)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const [issueId] = pathname.split('/').slice(-1)
    const [projectName] = pathname.split('/').slice(-2)
    const [project] = AllProjects.filter(pr => pr.key === projectName)
    const projectId = project.id

    // Validación de nombre no vacío
    if (!titleDesc.trim()) {
      setErrors({ ...errors, titleDesc: 'El titulo no puede estar vacío' });
      return;
    }

    // Validación de correo electrónico
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      setErrors({ ...errors, email: 'Ingresa un correo electrónico válido' });
      return;
    }

    // Validación de descripción no vacía
    if (!descripcion.trim()) {
      setErrors({ ...errors, descripcion: 'La descripción no puede estar vacía' });
      return;
    }

    // Restablece los mensajes de error en caso de éxito
    setErrors({ titleDesc: '', email: '', descripcion: '' });
    const data = { key, titleDesc, email, descripcion, projectId, issueId }
    // Ahora, realiza la solicitud POST usando axios
    //--------------------------------------------------------
    /*  await issuePost(data).then((response)=>{
       console.log('action response', response)
     })
     .catch(error => {
       // Manejar errores
       console.error(error);
     }); */
    //-------------------------------------------------------
    dispatch(issuePost(data))
  }

  return (
    <div className=' flex justify-center mx-3 lg:px-16'>
      <div className='flex flex-col w-full lg:w-2/4'>
        <form onSubmit={handleSubmit}>
          {/* <div className="text-red-500">
            {errors.usuario && <div>{errors.usuario}</div>}
            {errors.email && <div>{errors.email}</div>}
            {errors.descripcion && <div>{errors.descripcion}</div>}
          </div> */}
          <div className="space-y-12">
            <div className="pb-12">
              <div className="mt-8 grid grid-cols-1 gap-x-2 gap-y-4">
                <div className="">
                  <label htmlFor="titleDesc" className="block text-sm font-medium leading-6 text-slate-100">
                    Titulo Descriptivo*
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="title"
                      id="titleDesc"
                      autoComplete="given-name"
                      className="px-3 block w-full rounded-md border-0 py-1.5 text-slate-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-fontPlaceholder focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={titleDesc}
                      onChange={(e) => setTitleDesc(e.target.value)}
                    />
                  </div>
                </div>
                <div className="">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-100">
                    Email*
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      // type="email"
                      autoComplete="email"
                      className="px-3 block w-full rounded-md border-0 py-1.5 text-slate-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-fontPlaceholder focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className='mt-1'>
                  <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-slate-100">
                    Detalle de Incidencia*
                  </label>
                  <div className="mt-1">
                    <EditorText descripcion={descripcion} setDescripcion={setDescripcion} />
                  </div>
                </div>
                <div className="">
                  <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-slate-100">
                    Subir archivo
                  </label>
                  <div className="mt-1 flex rounded-lg border border-dashed border-gray-300/25 p-1">
                    <div className="text-center">
                      <div className="flex text-sm leading-6 text-gray-400">
                        <label
                          htmlFor="file-upload"
                          className="relative px-2 cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 hover:bg-sky-200"
                        >
                          <span>Subir archivo</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-9 flex items-center justify-center">
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Informar incidencia
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NotifyIncidentForm;