import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';
function ImageGalleryItem({ url, alt, openModal, largeImageURL }) {
  return (
    <li
      className={s['gallery-item']}
      onClick={e => {
        openModal(largeImageURL, alt);
      }}
    >
      <img src={url} alt={alt} />
    </li>
  );
}
ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
