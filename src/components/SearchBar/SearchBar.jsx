import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import css from "./searchBar.module.css";

function SearchBar({ onSubmit }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (value.trim() === "") {
      toast.error("Необхідно ввести текст для пошуку зображень");
    }

    onSubmit(value);
  }

  return (
    <header className={css.head}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={css.input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search images and photos"
        />
        <button type="submit" className={css.btn}>
          Search
        </button>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </header>
  );
}

export default SearchBar;
