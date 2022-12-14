import { useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const Modal = ({ onClose, largeImageId }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  });
  const handleKeyPress = e => {
    if (e.code !== 'Escape') {
      return;
    }
    onClose();
  };
  return (
    <div
      className={s.overlay}
      onClick={e => {
        onClose(e);
      }}
    >
      <div className={s.modal}>
        <img src={largeImageId} alt={'user'} />
      </div>
    </div>
  );
};
export default Modal;
Modal.propTypes = {
  largeImageId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
