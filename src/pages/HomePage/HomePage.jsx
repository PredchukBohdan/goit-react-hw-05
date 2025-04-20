import { useState, useEffect } from "react";
import moviesData from "../../api/films-api";
import s from "./HomePage.module.css";
import MovieList from "../../components/MovieList/MovieList";
import Pagination from "../../components/Pagination/Pagination";
import { BeatLoader } from "react-spinners";

const loaderStyles = {
  display: "block",
  margin: "0 auto",
  width: "fit-content",
  padding: "20px 0",
};

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await moviesData("trending", currentPage);
        if (data.results.length === 0) {
          setEmpty(true);
        } else {
          setEmpty(false);
        }
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, [currentPage]);

  const nextPage = () => {
    if (currentPage === totalPages) return;
    setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  return (
    <section className={s.movieListSection}>
      <h1 className={s.movieHeading}>Trending today</h1>
      {loading && (
        <BeatLoader
          color="#4d02b9"
          loading={loading}
          className="loader"
          cssOverride={loaderStyles}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
      {error && !loading && (
        <div className={s.error}>Server error. Please try again!!!</div>
      )}
      {!error && !loading && movies.length === 0 && empty && (
        <div className={s.empty}>No movies found</div>
      )}
      {movies.length > 0 && !error && <MovieList movies={movies} />}
      {totalPages > 0 && !error && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      )}
    </section>
  );
};
export default HomePage;
