import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import axios from "axios";

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [query, setQuery] = useState("");

  async function photoSearch(query) {
    try {
      const { data } = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query: query,
            per_page: 15,
            page: page,
            client_id: "lkWFJbmJzJ8aKsBXlkXRVMQgreAXnPGv3auFgXqv63U",
          },
        }
      );
      return data;
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setHasMore(false);
    photoSearch(query).then((data) => {
      if (!data.total) {
        setHasMore(false);
        setLoading(false);
        return;
      }
      setImages((prevImages) => [...prevImages, ...data.results]);
      setHasMore(page < data.total_pages);
      setLoading(false);
    });
  }, [query, page]);

  const handleSubmit = (value) => {
    if (value === query) {
      return;
    }
    setQuery(value);
    setPage(1);
    setImages([]);
    setHasMore(false);
  };

  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}
      {hasMore && <LoadMoreBtn onClick={loadMoreImages} hasMore={hasMore} />}
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={closeModal} />
      )}
    </>
  );
}
export default App;
