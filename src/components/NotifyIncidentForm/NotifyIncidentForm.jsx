/* eslint-disable react-hooks/exhaustive-deps */
import '@toast-ui/editor/dist/toastui-editor.css';
import { issuePost, getIssueTypes } from "../../redux/actions/";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Select, SelectItem } from '@tremor/react'
import { DocFiles, ImgFiles } from '../Icons';
import { Editor as TuiEditor } from '../Editor/index'

const NotifyIncidentForm = () => {

  const editorRef = useRef(null)
  const dispatch = useDispatch()
  const { issuesType, id } = useSelector(state => state.issuesTypes)
  const { jiraAccountId } = useSelector(state => state.user)
  const [titleDesc, setTitleDesc] = useState('');
  const [email, setEmail] = useState('');
  const [file, setfile] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState('')
  const [errors, setErrors] = useState({ titleDesc: '', email: '', descripcion: '' });
  const location = useLocation()
  const navigate = useNavigate();
  const { pathname } = location;
  const [IssueKey] = pathname.split('/').slice(-2)


  useEffect(() => {
    (async () => {
      const [projectName] = pathname.split('/').slice(-2)
      await getIssueTypes(projectName)(dispatch)
    })()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const descripcion = editorRef.current.getMarkdown()

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
    const data = { IssueKey, titleDesc, email, descripcion, projectId: id, issueId: selectedIssue, file }
    dispatch(issuePost(data, jiraAccountId))
  }

  const handleFileChange = (event) => {
    setfile([...file, event.target.files[0]]);
  };

  return (
    <>
      <div className='ml-7 mt-5'>
        <button onClick={() => navigate(-1)} className='bg-buttonBg px-3 py-2 text-white rounded-lg'>Atras</button>
      </div>
      <div className='flex justify-center mx-3 lg:px-16'>
        <div className='flex flex-col w-full lg:w-2/4'>
          <form onSubmit={handleSubmit} encType='multipart/form-data' >
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
                  <label className='text-white'>
                    Issue type
                    <Select
                      onValueChange={(value) => setSelectedIssue(value)}
                      className='z-50 mt-2'
                      value={selectedIssue}>
                      {issuesType?.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </Select>
                  </label>
                  <div className='mt-1'>
                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-slate-100">
                      Detalle de Incidencia*
                    </label>
                    <div className="mt-1">
                      <TuiEditor markdownRef={editorRef} />
                    </div>
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
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple
                            onChange={(e) => handleFileChange(e)}
                          />
                        </label>
                      </div>
                      {file.length > 0 ?
                        <div className='grid grid-cols-2'>
                          {file.map((el, i) => (
                            el.type === "image/png" ?
                              <button className='bg-bgCard rounded-lg overflow-auto w-48 flex flex-col items-center m-1 h-28' key={i} >
                                {/* <img
                                  className="w-64 h-48"
                                  src={el.content}
                                  // alt={`persona asignada ${el.author.displayName}`}
                                  // aria-label={`persona asignada ${el.author.displayName}`} 
                                /> */}
                                <ImgFiles />
                                <span className="text-font font-semibold">{el.name}</span>
                              </button>
                              :
                              <a href={el.content} key={i} >
                                <button className='bg-bgCard  rounded-lg overflow-auto w-48 flex flex-col items-center m-1 h-28'>
                                  <DocFiles />
                                  <span className="text-font font-semibold">{el.name}</span>
                                </button>
                              </a>
                          ))}
                        </div> : null
                      }
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
    </>
  )
}

export default NotifyIncidentForm;