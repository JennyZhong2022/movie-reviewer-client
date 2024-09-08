import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import styles from "./MovieList.module.scss";

const MovieList = ({ movieData, loading, error, setPageNumber,showLoadMore }) => (
  <>
    {loading && <p className={styles.loadingMessage}>Loading...</p>}
    {error && <p className={styles.errorMessage}>Error: {error}</p>}
    {movieData.length === 0 && !loading && (
      <p className={styles.noFoundMessage}>Oops, can't find the movie</p>
    )}

    <div className={styles.MovieCard}>
      {movieData.map((movie) => (
        <MovieCard key={movie.id} movie={movie}></MovieCard>
      ))}
    </div>
  {showLoadMore && (<div className={styles.loadMoreBtn}>
      <button onClick={() => setPageNumber((prev) => prev + 1)}>Load More</button>
    </div>)}
  </>
);

export default MovieList;
