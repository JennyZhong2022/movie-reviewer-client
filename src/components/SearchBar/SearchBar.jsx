import React, { useContext, useState } from "react";
import styles from "./SearchBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { SearchQueryContext } from "../../context/SearchQueryContextProvider";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useContext(SearchQueryContext);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(inputValue.toLowerCase());
    navigate("/movies-search");
    setInputValue("");
  };

  // console.log(searchTerm);
  // console.log(inputValue);

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.searchInput}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search..."
      />
      <button className={styles.searchButton} type="submit">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
};

export default SearchBar;
