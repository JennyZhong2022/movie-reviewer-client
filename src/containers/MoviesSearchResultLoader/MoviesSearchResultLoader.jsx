import React, { useContext } from "react";
import { SearchQueryContext } from "../../context/SearchQueryContextProvider";
import useFetchMovies from "../../custom-hook/useFetchMovies";
import MovieList from "../../components/MovieList/MovieList";


const SearchedMovies = () => {
  const { searchTerm } = useContext(SearchQueryContext);
  const { pageNumber, setPageNumber, movieData, loading, error } = useFetchMovies(1, "2024", searchTerm);

  console.log("searchTerm:", searchTerm); // Check searchTerm in console

  return (
    <MovieList
      movieData={movieData}
      loading={loading}
      error={error}
      setPageNumber={setPageNumber}
      showLoadMore={false}
    />
  );
};

export default SearchedMovies;
