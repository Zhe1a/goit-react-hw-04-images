import { useState, useEffect } from 'react';
import ArticlesApi from './ArticlesApi';
import Button from './Button';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import Loader from './Loader';
import Modal from './Modal';

const App = () => {
  const [valueForm, setValueForm] = useState('');
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImageId, setLargeImageId] = useState([]);

  useEffect(() => {
    if (valueForm === '') return;
    setIsLoading(true);
    ArticlesApi(valueForm, page)
      .then(res => {
        setArticles(elm=> page === 1 ? res.hits : [...elm, ...res.hits]);
        setTotalPage(Math.ceil(res.total / 12));
      })
      .catch(error => {
        console.log(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [valueForm, page]);

  const onSearchbar = value => {
    setValueForm(value);
    setPage(1);
  };

  const hendelPageClick = () => {
    setPage(pes => pes + 1);
  };
  const openModal = props => {
    setIsModalOpen(true);
    setLargeImageId(props);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <>
      <Searchbar onSearchbar={onSearchbar} />
      {isLoading && <Loader />}
      {articles.length > 0 ? (
        <ImageGallery item={articles} openModal={openModal} />
      ) : null}
      {articles.length > 0 && totalPage > page && (
        <Button hendelPageClick={hendelPageClick} />
      )}
      {isModalOpen && (
        <Modal
          onClose={closeModal}
          largeImageId={largeImageId}
        />
      )}
    </>
  );
};

export default App;
