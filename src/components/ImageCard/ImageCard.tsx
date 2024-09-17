import { Image } from "../../types/img";
import css from "./imageCard.module.css";

type Props = {
  image: Image;
  onOpen: () => void;
};

const ImageCard: React.FC<Props> = ({ image, onOpen }) => {
  const { urls, description } = image;

  return (
    <div className={css.card} onClick={onOpen}>
      <img src={urls.small} alt={description} />
    </div>
  );
};

export default ImageCard;
