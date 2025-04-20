import s from "./MovieDetailsPage.module.css";
import moviesData from "../../api/films-api";
import React, { useRef, useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import imagePlaceholder from "../../images/image-placeholder.svg";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";

const loaderStyles = {
  display: "block",
  margin: "0 auto",
  width: "fit-content",
  padding: "20px 0",
};

const MovieDetailsPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = useRef(location.state ?? "/movies");

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await moviesData("id", 1, movieId);
        setMovies(data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, []);

  const {
    poster_path,
    title,
    genres,
    origin_country,
    overview,
    vote_average,
    production_companies,
    release_date,
    runtime,
    tagline,
  } = movies;

  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
    : imagePlaceholder;

  return (
    <div className={s.movieDetailsPage}>
      <Link className={s.back} to={backLink.current}>
        Go Back
      </Link>

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
      {!loading && (
        <div className={s.movieItem}>
          <div className={s.movieImageWrapper}>
            <img src={imageUrl} alt={title} />
            <h2 className={s.movieTitleMobile}>{title}</h2>
            {tagline && <p className={s.movieTaglineMobile}>{tagline}</p>}
            {origin_country && (
              <div className={s.movieCountry}>
                <p>Country:</p>
                <ul>
                  {origin_country.map((country, index) => (
                    <li key={index} className={s.movieCountryItem}>
                      {country}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {production_companies && (
              <div className={s.movieStudio}>
                <p>Company:</p>
                <ul>
                  {production_companies.map((company) => (
                    <li key={company.id} className={s.movieStudioItem}>
                      {company.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {runtime && (
              <div className={s.movieTime}>
                <p>Time:</p>
                <p className={s.movieItemTime}>{runtime} min.</p>
              </div>
            )}
            {release_date && (
              <div className={s.movieRelease}>
                <p>Release Date:</p>
                <p className={s.movieItemRelease}>{release_date}</p>
              </div>
            )}
            {vote_average && (
              <div className={s.movieRating}>
                <p>Rating:</p>
                <p className={s.movieItemRating}>{vote_average}</p>
              </div>
            )}
          </div>
          <div className={s.movieInfoWrapper}>
            <h2 className={s.movieTitle}>{title}</h2>
            {tagline && <p className={s.movieTagline}>{tagline}</p>}
            {overview && <p className={s.movieOverview}>{overview}</p>}
            {genres && (
              <div className={s.movieGenres}>
                <p>Genres:</p>
                <ul>
                  {genres.map((genre) => (
                    <li key={genre.id} className={s.movieGenreItem}>
                      {genre.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {movies && (
              <div className={s.wrapper}>
                <NavLink
                  className={({ isActive }) =>
                    `${s.link} ${isActive ? s.active : ""}`
                  }
                  to="cast"
                >
                  Cast
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    `${s.link} ${isActive ? s.active : ""}`
                  }
                  to="reviews"
                >
                  Reviews
                </NavLink>
              </div>
            )}
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};
export default MovieDetailsPage;
