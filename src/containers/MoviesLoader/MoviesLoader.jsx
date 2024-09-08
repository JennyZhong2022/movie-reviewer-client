import React from "react";
import useFetchMovies from "../../custom-hook/useFetchMovies";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./MoviesLoader.module.scss";

const MoviesLoader = () => {
  const { pageNumber, setPageNumber, movieData, loading, error } = useFetchMovies(1, "2024", "");

  return (
    <div>
      <div className={styles.h2}>
        <h2>New Released Movies</h2>
      </div>

      <MovieList
        movieData={movieData}
        loading={loading}
        error={error}
        setPageNumber={setPageNumber}
        showLoadMore={true}

      />
    </div>
  );
};

export default MoviesLoader;
