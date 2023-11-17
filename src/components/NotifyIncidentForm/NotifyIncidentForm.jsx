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
import { parseTextToJiraFormatt } from '../../utils';
import Swal from 'sweetalert2';
import { useCallback } from 'react';
import incidentTemplate from './incident-template.json'
import { ISSUETYPE_COD } from '../../const';

const NotifyIncidentForm = () => {

  const editorRef = useRef(null)
  const dispatch = useDispatch()
  const { issuesType, id } = useSelector(state => state.issuesTypes)
  const { jiraAccountId } = useSelector(state => state.user)
  const [titleDesc, setTitleDesc] = useState('');
  const [file, setfile] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState('')
  const [loading, setLoading] = useState(false)
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
    const descripcion = parseTextToJiraFormatt(editorRef.current.getMarkdown())

    // Validación de nombre no vacío
    if (!titleDesc.trim()) {
      setErrors({ ...errors, titleDesc: 'El titulo no puede estar vacío' });
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El titulo no puede estar vacío!!",
      });
      return;
    }

    if (selectedIssue === '') {
      setErrors({ ...errors, descripcion: 'El tipo de incidencia no puede estar vacío' });
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El tipo de incidencia no puede estar vacío!!",
      });
      return;
    }

    // Validación de descripción no vacía
    if (descripcion.length < 1) {
      setErrors({ ...errors, descripcion: 'La descripción no puede estar vacía' });
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La descripción no puede estar vacía!!",
      });
      return;
    }

    // Restablece los mensajes de error en caso de éxito
    setErrors({ titleDesc: '', descripcion: '' });
    setLoading(true)
    const data = { IssueKey, titleDesc, descripcion, projectId: id, issueId: selectedIssue, file }
    dispatch(issuePost(data, jiraAccountId))
  }

  const deleteItemFile = (name) => {
    const arrfile = file.filter(f => f.name !== name)
    setfile(arrfile)
  }

  const handleFileChange = (event) => {
    let fl = file.some(fi => fi.name === event.target.files[0].name)

    if (!fl) setfile([...file, event.target.files[0]]);
  };


  const Editor = useCallback(() => {

    let template 

    if (!selectedIssue) {
      template = ''
    } else if (selectedIssue === ISSUETYPE_COD.ERROR) {
      template = incidentTemplate.Error.template
    } else if (selectedIssue === ISSUETYPE_COD.TAREA) {
      template = incidentTemplate.Tarea.template
    }

    return <TuiEditor markdownRef={editorRef} initialValue={template}/>
  }, [selectedIssue])

  return (
    <>
      <div className='ml-7 mt-5'>
        <button onClick={() => navigate(-1)} className='bg-buttonBg px-3 py-2 text-white rounded-lg'>Atras</button>
      </div>
      <div className='flex justify-center mx-3 lg:px-16'>
        <div className='flex flex-col w-full lg:w-2/4'>
          <form onSubmit={handleSubmit} encType='multipart/form-data' >
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
                  <label className='text-white'>
                    Tipo de incidencia*
                    <Select
                      onValueChange={(value) => {setSelectedIssue(value)}}
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
                      <Editor />
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
                              <div className='relative' key={i} >
                                <span onClick={() => deleteItemFile(el.name)} className='bg-red-500 z-50 text-white flex justify-center cursor-pointer items-center absolute top-0 right-0 h-5 w-5 rounded-full'>X</span>
                                <div className='bg-bgCard rounded-lg overflow-auto w-48 flex flex-col items-center m-1 h-28' >
                                  <ImgFiles />
                                  <span className="text-font font-semibold">{el.name}</span>
                                </div>
                              </div>

                              :
                              <div className='relative' key={i}>
                                <span onClick={() => deleteItemFile(el.name)} className='bg-red-500 z-50 text-white flex justify-center cursor-pointer items-center absolute top-0 right-0 h-5 w-5 rounded-full'>X</span>
                                <a href={el.content}  >
                                  <div className='bg-bgCard  rounded-lg overflow-auto w-48 flex flex-col items-center m-1 h-28'>
                                    <DocFiles />
                                    <span className="text-font font-semibold">{el.name}</span>
                                  </div>
                                </a>
                              </div>
                          ))}
                        </div> : null
                      }
                    </div>
                  </div>
                </div>
                <div className="mt-9 flex items-center justify-center">
                  {loading ?
                    <main className='w-48 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm flex justify-center items-center'>
                      <div className='w-8 h-8 border-2 border-white rounded-full animate-spin border-r-transparent' />
                    </main>
                    :
                    <button
                      //onClick={() => setLoading(true)}
                      type="submit"
                      className="w-48 h-12 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Informar incidencia
                    </button>
                  }

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