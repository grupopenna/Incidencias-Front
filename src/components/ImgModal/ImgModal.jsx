import { PropTypes } from 'prop-types';

const ImgModal = ({ openImageState, imageView }) => {
  return (
    <div onClick={() => openImageState(false)} className="z-10 fixed left-[-10px] right-[-10px] bottom-[-10px] top-[-10px]  bg-bgModal flex justify-center items-center">
      <div className="h-4/5 w-4/5 rounded-lg p-3 flex justify-center items-center">
        <img
          className="w-full h-full object-contain"
          src={imageView}
          alt={`persona asignada`}
          aria-label={`persona asignada`} />
      </div>
    </div>
  )
}
ImgModal.propTypes = {
  openImageState: PropTypes.func,
  imageView: PropTypes.string
}
export default ImgModal