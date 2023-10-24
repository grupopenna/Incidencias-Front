import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';

const Modal = ({ setModalShow, itemSelect }) => {

  const [item, setItem] = useState(null)

  useEffect(() => {
    setItem(itemSelect)
  }, [item])

  return (
    <div onClick={() => setModalShow(false)} className="z-10 fixed left-[-10px] right-[-10px] bottom-[-10px] top-[-5px] h-screen w-full bg-bgModal flex justify-center items-center">
      <div className="bg-white h-4/5 w-4/5 rounded-lg p-3">
        <div>
          <button onClick={() => setModalShow(false)} className="border-2 p-1 rounded-full">X</button>
        </div>
        {item && (<>
          {/*-------seccion--1-------- */}
          <div>
            <div>
              <p>{item.fields.summary}</p>
            </div>
            <div>
              <p>Descripción: {item.fields.description}</p>
            </div>
            <div>Comentarios:</div>
          </div>
          {/*-------seccion--2-------- */}
          <div>
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