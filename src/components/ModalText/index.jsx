
const ModalText = ({ children }) => {
  return (
    <div className="z-10 fixed left-[-10px] right-[-10px] bottom-[-10px] top-[-10px]  bg-bgModal flex justify-center items-center">
        {children}
    </div>
  )
}


export default ModalText

