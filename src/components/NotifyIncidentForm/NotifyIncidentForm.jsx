import { useState } from "react";
import { issuePost } from "../../redux/actions/issue/issuePost";
import { useLocation } from "react-router-dom";
import MDEditor, { commands } from '@uiw/react-md-editor'

const NotifyIncidentForm = (key) => {
  const [content, setContent] = useState()
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [errors, setErrors] = useState({ usuario: '', email: '', descripcion: '' });
  const location = useLocation()
  const { pathname } = location;
  // Toolbar edito
  console.log(content)
  const title1 = {
    ...commands.title1,
    icon: (
      <svg width="12" height="12" viewBox="0 0 520 520">
      <path
        fill="currentColor"
        d="M15.7083333,468 C7.03242448,468 0,462.030833 0,454.666667 L0,421.333333 C0,413.969167 7.03242448,408 15.7083333,408 L361.291667,408 C369.967576,408 377,413.969167 377,421.333333 L377,454.666667 C377,462.030833 369.967576,468 361.291667,468 L15.7083333,468 Z M21.6666667,366 C9.69989583,366 0,359.831861 0,352.222222 L0,317.777778 C0,310.168139 9.69989583,304 21.6666667,304 L498.333333,304 C510.300104,304 520,310.168139 520,317.777778 L520,352.222222 C520,359.831861 510.300104,366 498.333333,366 L21.6666667,366 Z M136.835938,64 L136.835937,126 L107.25,126 L107.25,251 L40.75,251 L40.75,126 L-5.68434189e-14,126 L-5.68434189e-14,64 L136.835938,64 Z M212,64 L212,251 L161.648438,251 L161.648438,64 L212,64 Z M378,64 L378,126 L343.25,126 L343.25,251 L281.75,251 L281.75,126 L238,126 L238,64 L378,64 Z M449.047619,189.550781 L520,189.550781 L520,251 L405,251 L405,64 L449.047619,64 L449.047619,189.550781 Z"
      />
    </svg>
    ),
    /**
     * 
     * @param {TextState} state 
     * @param {TextAreaTextApi} api 
     */
    execute: (state, api) => {
      let modifyText = `# ${state.selectedText}\n`;
      if (!state.selectedText) {
        modifyText = `# `;
      }
      api.replaceSelection(modifyText);
    }
  }

  const title2 = {
    ...commands.title2,
    icon: (
      <svg width="12" height="12" viewBox="0 0 520 520">
      <path
        fill="currentColor"
        d="M15.7083333,468 C7.03242448,468 0,462.030833 0,454.666667 L0,421.333333 C0,413.969167 7.03242448,408 15.7083333,408 L361.291667,408 C369.967576,408 377,413.969167 377,421.333333 L377,454.666667 C377,462.030833 369.967576,468 361.291667,468 L15.7083333,468 Z M21.6666667,366 C9.69989583,366 0,359.831861 0,352.222222 L0,317.777778 C0,310.168139 9.69989583,304 21.6666667,304 L498.333333,304 C510.300104,304 520,310.168139 520,317.777778 L520,352.222222 C520,359.831861 510.300104,366 498.333333,366 L21.6666667,366 Z M136.835938,64 L136.835937,126 L107.25,126 L107.25,251 L40.75,251 L40.75,126 L-5.68434189e-14,126 L-5.68434189e-14,64 L136.835938,64 Z M212,64 L212,251 L161.648438,251 L161.648438,64 L212,64 Z M378,64 L378,126 L343.25,126 L343.25,251 L281.75,251 L281.75,126 L238,126 L238,64 L378,64 Z M449.047619,189.550781 L520,189.550781 L520,251 L405,251 L405,64 L449.047619,64 L449.047619,189.550781 Z"
      />
    </svg>
    ),
    /**
     * 
     * @param {TextState} state 
     * @param {TextAreaTextApi} api 
     */
    execute: (state, api) => {
      let modifyText = `## ${state.selectedText}\n`;
      if (!state.selectedText) {
        modifyText = `## `;
      }
      api.replaceSelection(modifyText);
    }
  }

  const title3 = {
   ...commands.title3,
    icon: (
      <svg width="12" height="12" viewBox="0 0 520 520">
      <path
        fill="currentColor"
        d="M15.7083333,468 C7.03242448,468 0,462.030833 0,454.666667 L0,421.333333 C0,413.969167 7.03242448,408 15.7083333,408 L361.291667,408 C369.967576,408 377,413.969167 377,421.333333 L377,454.666667 C377,462.030833 369.967576,468 361.291667,468 L15.7083333,468 Z M21.6666667,366 C9.69989583,366 0,359.831861 0,352.222222 L0,317.777778 C0,310.168139 9.69989583,304 21.6666667,304 L498.333333,304 C510.300104,304 520,310.168139 520,317.777778 L520,352.222222 C520,359.831861 510.300104,366 498.333333,366 L21.6666667,366 Z M136.835938,64 L136.835937,126 L107.25,126 L107.25,251 L40.75,251 L40.75,126 L-5.68434189e-14,126 L-5.68434189e-14,64 L136.835938,64 Z M212,64 L212,251 L161.648438,251 L161.648438,64 L212,64 Z M378,64 L378,126 L343.25,126 L343.25,251 L281.75,251 L281.75,126 L238,126 L238,64 L378,64 Z M449.047619,189.550781 L520,189.550781 L520,251 L405,251 L405,64 L449.047619,64 L449.047619,189.550781 Z"
      />
    </svg>
    ),
    /**
     * 
     * @param {TextState} state 
     * @param {TextAreaTextApi} api 
     */
    execute: (state, api) => {
      let modifyText = `### ${state.selectedText}\n`;
      if (!state.selectedText) {
        modifyText = `### `;
      }
      api.replaceSelection(modifyText);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de nombre no vacío
    if (!usuario.trim()) {
      setErrors({ ...errors, usuario: 'El nombre no puede estar vacío' });
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
      setErrors({ usuario: '', email: '', descripcion: '' });
      const data = {key, usuario, email, descripcion, pathname}
      // Ahora, realiza la solicitud POST usando axios
      await issuePost(data).then((response)=>{
        console.log('action response', response)
      })
      .catch(error => {
        // Manejar errores
        console.error(error);
      });
  }

  return(
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
                  <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-slate-100">
                    Usuario*
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="px-3 block w-full rounded-md border-0 py-1.5 text-slate-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-fontPlaceholder focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={usuario}
                      onChange={(e) => setUsuario(e.target.value)}
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
                    Incidencia*
                  </label>
                  <div className="mt-1">
                    <MDEditor 
                      commands={[
                        commands.bold,
                        commands.italic,
                        commands.strikethrough,
                        title1,
                        title2,
                        title3,
                        commands.divider,
                        commands.quote,
                        commands.link,
                        commands.image,
                        commands.table,
                        commands.unorderedListCommand,
                        commands.orderedListCommand,
                        commands.checkedListCommand,
                        commands.help
                      ]}
                      value={content} onChange={setContent} data-color-mode="light" height='500px'/>
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