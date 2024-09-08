import styles from "./MovieCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartCircleMinus,
  faHeartCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { FavoriteMovieContext } from "../../context/FavoriteMovieContextProvider";

const languageMap = {
  en: "English",
  zh: "Chinese",
  es: "Spanish",
  fr: "French",
  de: "German",
  ja: "Japanese",
  ko: "Korean",
};

const MovieCard = ({ movie }) => {
  const { favoriteList, setFavoriteList } = useContext(FavoriteMovieContext);

  const getLanguageName = (code) => {
    return languageMap[code] || "Unknown";
  };

  // Using favoriteList.some((m) => m.id === movie.id) ensures that the comparison is based on a unique identifier (id), making it more accurate and reliable, especially when dealing with objects that might be recreated or fetched from different sources. This way, even if two movie objects are different instances but represent the same movie, they will be correctly identified as the same. Because includes doesn't work!

  //check is movie is in the favoriteList
  const isFavorite = (movie) => {
    return favoriteList.some((m) => m.id === movie.id);
  };

  // add to favorite or remove from favorite
  const handleFavoriteBtn = (e) => {
    e.stopPropagation();
    const newFavorites = isFavorite(movie)
      ? favoriteList.filter((m) => m.id !== movie.id)
      : [...favoriteList, movie];
    setFavoriteList(newFavorites);
    console.log("favorite button clicked");
  };
  //
  // console.log(movie.id);
  return (
    <div className={styles.movieCard}>
      <Link to={`/movie/${movie.id}`} className={styles.movieLink}>
        <div className={styles.MovieCardLeftSide}>
          <img
            src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
            alt={`${movie.title} poster`}
          />
        </div>
        <div className={styles.MovieCardRightSide}>
          <h4>
            {movie.title}{" "}
            <span className={styles.year}>
              ({movie.release_date.split("-")[0]})
            </span>
          </h4>
          <div className={styles.rating}>
            <span className={styles.star}>⭐</span>
            {movie.vote_average}
          </div>
          <div className={styles.basicInformation}>
            <p>
              {movie.release_date.split("-")[0]} /{" "}
              {getLanguageName(movie.original_language)}
            </p>
          </div>
        </div>
      </Link>
      <div className={styles.actionButtons}>
        <button className={styles.btn} onClick={handleFavoriteBtn}>
          <FontAwesomeIcon
            icon={!isFavorite(movie) ? faHeartCirclePlus : faHeartCircleMinus}
          />
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
