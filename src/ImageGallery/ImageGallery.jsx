import ImageCard from "../ImageCard/ImageCard";
import css from "./imageGallery.module.css";

function ImageGallery({ images, onImageClick }) {
  return (
    <ul className={css.list}>
      {images.map((image) => (
        <ImageCard key={image.id} image={image} onClick={onImageClick} />
      ))}
    </ul>
  );
}

export default ImageGallery;
