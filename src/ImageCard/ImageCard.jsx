import css from "./imageCard.module.css";
function ImageCard({ image, onClick }) {
  return (
    <li className={css.card}>
      <div>
        <img
          className={css.card}
          onClick={() => onClick(image)}
          src={image.urls.small}
          alt={image.alt_description}
        />
      </div>
    </li>
  );
}

export default ImageCard;
