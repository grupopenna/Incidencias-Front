import { useEffect } from 'react';
import { AdjIcon } from '../Icons';
import { DocFiles, ImgFiles } from '../Icons';

const AdjuntarArchivos = ({ file, setFile, Attachfiles, loading }) => {

  useEffect(() => {

  }, [file.length])

  const deleteItemFile = (name) => {
    const arrfile = file.filter(f => f.name !== name)
    setFile(arrfile)
  }

  const handleFileChange = (event) => {
    if (file.some(fi => fi.name === event.target.files[0].name)) {
      return
    } setFile([...file, event.target.files[0]]);
  };

  return (
    <div className="mt-1 flex rounded-lg border border-dashed border-gray-300/25 p-1">
      <div className="text-center">
        <div className="flex text-sm leading-6 text-gray-400">
          <label
            htmlFor="file-upload"
            className="relative px-2 cursor-pointer border-2 rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 hover:bg-sky-200"
          >
            <div className='flex items-center'>
              <span>Subir archivo</span>
              <AdjIcon />
            </div>
            <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple
              onChange={(e) => handleFileChange(e)}
            />
          </label>

          {file.length > 0 &&
            <div className='ml-20'>
              <button onClick={() => Attachfiles()} className='mr-3 cursor-pointer px-2 border-2 rounded-md bg-white font-semibold text-buttonBg hover:border-buttonBg uppercase'>agregar</button>
              <button onClick={() => setFile([])} className='cursor-pointer px-2 border-2 rounded-md bg-white font-semibold text-black hover:border-black uppercase'>cancelar</button>
            </div>
          }
        </div>
        {loading ?
          <main className='bg-white flex justify-center items-center'>
            <div className='w-8 h-8 border-2 border-background rounded-full animate-spin border-r-transparent' />
          </main>
          :
          file.length > 0 ?
            <div className='grid grid-cols-2 mt-2'>
              {file.map((el, i) => (
                el.type === "image/png" ?
                  <div key={i} className='border-4 relative'>
                    <button onClick={() => deleteItemFile(el.name)} className='bg-red-500 z-50 text-white flex justify-center items-center absolute top-0 right-0 h-5 w-5 rounded-full'>X</button>
                    <button className='bg-bgCard rounded-lg overflow-auto w-48 flex flex-col items-center m-1 h-28' >
                      <ImgFiles />
                      <span className="text-font font-semibold">{el.name}</span>
                    </button>
                  </div>
                  :
                  <div key={i} className='border-4 relative'>
                    <button onClick={() => deleteItemFile(el.name)} className='bg-red-500 z-50 text-white flex justify-center items-center absolute top-0 right-0 h-5 w-5 rounded-full'>X</button>
                    <a href={el.content}>
                      <button className='bg-bgCard  rounded-lg overflow-auto w-48 flex flex-col items-center m-1 h-28'>
                        <DocFiles />
                        <span className="text-font font-semibold">{el.name}</span>
                      </button>
                    </a>
                  </div>
              ))}
            </div> : null
        }
      </div>
    </div>
  )
}

export default AdjuntarArchivos