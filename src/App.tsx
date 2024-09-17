// import { ProgressBar } from "react-loader-spinner";
import { useEffect, useState } from "react";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageModal from "./components/ImageModal/ImageModal";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { getData } from "./services/Getdata";
import { Image } from "./types/img";
import Loader from "./components/Loader/Loader";

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [query, setQuery] = useState<string | number>("");
  const [page, setPage] = useState<number | null>(1);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const fetchImages = async (searchQuery: string | number, pageNumber = 1) => {
    try {
      setLoading(true);
      setError("");
      const data = await getData(searchQuery, pageNumber);
      console.log(data);

      if (pageNumber === 1) {
        setImages(data.results);
      } else {
        setImages((prevImages) => [...prevImages, ...data.results]);
      }

      if (data.total_pages > pageNumber) {
        setPage(pageNumber + 1);
      } else {
        setPage(null);
      }
    } catch (err) {
      setError("Something went wrong, please try again later");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      setPage(1);
      fetchImages(query, 1);
    }
  }, [query]);

  const handleSearch = (newQuery: string | number) => {
    setQuery(newQuery);
  };

  const onLoadMore = () => {
    if (page) {
      fetchImages(query, page);
    }
  };

  const onClose = () => setSelectedImage(null);
  const onOpen = (image: Image) => setSelectedImage(image);

  console.log(selectedImage);

  return (
    <>
      <div>
        <SearchBar onSubmit={handleSearch} />
        {error && <ErrorMessage error={error} />}
        {loading && <Loader />}
        {images.length > 0 && <ImageGallery images={images} onOpen={onOpen} />}
        {images.length > 0 && page && !loading && (
          <LoadMoreBtn onLoadMore={onLoadMore} />
        )}
      </div>
      <ImageModal
        isOpen={!!selectedImage}
        image={selectedImage}
        onClose={onClose}
      />
    </>
  );
}

export default App;
