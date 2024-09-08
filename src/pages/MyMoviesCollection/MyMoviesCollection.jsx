import React from "react";
import { FavoriteMovieContext } from "../../context/FavoriteMovieContextProvider";
import MovieCard from "../../components/MovieCard/MovieCard";
import { useContext } from "react";
import styles from "./MyMoviesCollection.module.scss";

const MyMoviesCollection = () => {
  const { favoriteList } = useContext(FavoriteMovieContext);

  return (
    <>
      {favoriteList.length === 0 ? (
        <div className={styles.noFavoriteMoviesMessage}>
          <h1>No favorite movies yet.</h1>
        </div>
      ) : (
        <div className={styles.movieCollectionContainer}>
          {favoriteList.map((favorite) => (
            <MovieCard key={favorite.id} movie={favorite} />
          ))}
        </div>
      )}
    </>
  );
};

export default MyMoviesCollection;
