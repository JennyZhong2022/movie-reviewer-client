import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../../services/movie-services";
import MovieDetails from "../../pages/MovieDetails/MoviesDetails";
import styles from "./MovieDetailsLoader.module.scss";

const MovieDetailsLoader = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState("");
  const [error, setError] = useState(null);
  const [fetchStatus, setFetchStatus] = useState("");
  const [directors, setDirectors] = useState([]);
  const [actors, setActors] = useState([]);

  useEffect(() => {
    if (!id) return;

    setFetchStatus("LOADING");
    getMovieById(id)
      .then((data) => {
        console.log(data);
        setFetchStatus("SUCCESS");
        setMovie(data.movie);

        setDirectors(
          data.credits.crew.filter((member) => member.job === "Director")
        );

        setActors(data.credits.cast.slice(0, 2));
      })
      .catch((error) => {
        setFetchStatus("FAILED");
        setError(error);
      });
  }, [id]);

  return (
    <div className={styles.MovieDetailsLoaderContainer}>
      {fetchStatus === "LOADING" && (
        <p className={styles.loadingMessage}>Loading</p>
      )}
      {fetchStatus === "FAILED" && <p>{error.message}</p>}

      {fetchStatus === "SUCCESS" && (
        <MovieDetails movie={movie} directors={directors} actors={actors} />
      )}
    </div>
  );
};

export default MovieDetailsLoader;
