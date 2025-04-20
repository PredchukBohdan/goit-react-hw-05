import s from "./MoviesPage.module.css";
import moviesData from "../../api/films-api";
import MovieList from "../../components/MovieList/MovieList";
import Pagination from "../../components/Pagination/Pagination";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const loaderStyles = {
  display: "block",
  margin: "0 auto",
  width: "fit-content",
  padding: "20px 0",
};

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [empty, setEmpty] = useState(false);

  const initialQuery = searchParams.get("query") || "";
  const initialPage = parseInt(searchParams.get("page"), 10) || 1;

  const [value, setValue] = useState(initialQuery);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [urlQuery, setUrlQuery] = useState(initialQuery);

  const updateSearchParams = (query, page) => {
    const updatedParams = new URLSearchParams();

    if (query) {
      updatedParams.set("query", query);
    }
    if (page && page !== 1) {
      updatedParams.set("page", page.toString());
    }

    setSearchParams(updatedParams);
  };

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);
        setError(false);
        setEmpty(false);
        if (value) {
          updateSearchParams(value, currentPage);
        }
        const data = await moviesData("search", currentPage, value);
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
  }, [currentPage, urlQuery]);

  const nextPage = () => {
    if (currentPage === totalPages) return;
    setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const query = event.target.query.value.trim();

    if (!query) {
      setValue("");
      setUrlQuery("");
      setCurrentPage(1);
      setSearchParams(new URLSearchParams());
      return;
    }

    setValue(query);
    setUrlQuery(query);
    setCurrentPage(1);
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <section className={s.moviesPage}>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          name="query"
          type="text"
          placeholder="Search movies by title"
          value={value}
          onChange={handleChange}
          className={s.input}
        />
        <button className={s.button} type="submit">
          Search
        </button>
      </form>
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
      {!error && !loading && movies.length === 0 && empty && urlQuery && (
        <div className={s.empty}>No movies found</div>
      )}
      {movies.length > 0 && !error && !loading && <MovieList movies={movies} />}
      {movies.length > 0 && totalPages > 0 && !loading && !error && (
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
export default MoviesPage;
