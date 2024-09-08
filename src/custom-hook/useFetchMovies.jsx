import { useState, useEffect } from "react";
import { getMoviesByFetch } from "../services/movie-services";

const useFetchMovies = (initialPageNumber, initialYear, searchTerm) => {
  const [pageNumber, setPageNumber] = useState(initialPageNumber);
  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMoviesByFetch(searchTerm, pageNumber, selectedYear);
        setMovieData((prev) =>
          pageNumber === 1 ? data.results : [...prev, ...data.results]
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [pageNumber, selectedYear, searchTerm]);

  return { pageNumber, setPageNumber, selectedYear, setSelectedYear, movieData, loading, error };
};

export default useFetchMovies;
