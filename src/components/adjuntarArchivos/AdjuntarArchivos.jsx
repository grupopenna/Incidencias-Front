import { useEffect } from 'react';
import { AdjIcon } from '../Icons';
import { DocFiles, ImgFiles } from '../Icons';

const AdjuntarArchivos = ({ file, setFile }) => {

  useEffect(() => {

  }, [file.length])

  const handleFileChange = (event) => {
    setFile([...file, event.target.files[0]]);
  };
  return (
    <div className="mt-1 flex rounded-lg border border-dashed border-gray-300/25 p-1">
      <div className="text-center">
        <div className="flex text-sm leading-6 text-gray-400">
          <label
            htmlFor="file-upload"
            className="relative px-2 cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 hover:bg-sky-200"
          >
            <div className='flex'>
              <span>Subir archivo</span>
              <AdjIcon />
            </div>
            <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple
              onChange={(e) => handleFileChange(e)}
            />
          </label>
        </div>
        {file.length > 0 ?
          <div className='grid grid-cols-2 mt-2'>
            {file.map((el, i) => (
              el.type === "image/png" ?
                <button className='bg-bgCard rounded-lg overflow-auto w-48 flex flex-col items-center m-1 h-28' key={i} >
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
  )
}

export default AdjuntarArchivos