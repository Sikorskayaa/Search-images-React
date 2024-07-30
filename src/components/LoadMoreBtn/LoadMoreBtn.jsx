import css from "./loadMore.module.css";

const LoadMoreBtn = ({ onClick, hasMore }) => {
  return (
    <div>
      {hasMore && (
        <button onClick={onClick} className={css.btn}>
          Load more
        </button>
      )}
    </div>
  );
};

export default LoadMoreBtn;
