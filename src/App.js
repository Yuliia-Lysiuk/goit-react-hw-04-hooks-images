import { useEffect, useState } from 'react';
import './App.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ImageGallery from './components/ImageGallery/ImageGallery';
import Searchbar from './components/Searchbar/Searchbar';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import Loader from './components/Loader/Loader';
import API from './Services/Services';

export function App() {
  const [search, setSearch] = useState('');
  const [img, setImg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [largePicture, setLargePicture] = useState('');

  useEffect(() => {
    if (search === '') {
      return;
    }
    searchImages();
  }, [search, page]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleSubmit = newSearch => {
    setSearch(newSearch);
    setPage(1);
    setImg(null);
  };

  const handleOpenModal = e => {
    const largeImg = e.target.dataset.action;
    setLargePicture(largeImg);
    toggleModal();
  };

  const searchImages = () => {
    setLoading(true);
    API.getImages(search, page)
      .then(response => {
        if (page === 1) {
          return setImg([...response]);
        }
        setImg(prevState => {
          return [...prevState, ...response];
        });

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChangePage = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSubmit} />
      <ToastContainer autoClose={3000} />
      {img && (
        <>
          <ImageGallery img={img} onClick={handleOpenModal} />
          {!loading && <Button onClick={handleChangePage} img={img} />}
        </>
      )}
      {loading && <Loader />}
      {modal && <Modal largePicture={largePicture} onClose={toggleModal} />}
    </div>
  );
}
