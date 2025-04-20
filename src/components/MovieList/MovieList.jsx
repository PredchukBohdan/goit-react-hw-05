import { NavLink } from "react-router-dom";
import s from "./MovieList.module.css";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import imagePlaceholder from "../../images/image-placeholder.svg";

const MovieList = ({ movies }) => {
  const location = useLocation();

  useEffect(() => {
    if (movies.length > 0) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [movies]);

  return (
    <ul className={s.movieList}>
      {movies.map((movie) => {
        const imageUrl = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
          : imagePlaceholder;
        const checkRating = () => {
          let badgeClass = null;
          if (movie.vote_average == null || movie.vote_average == undefined)
            return;

          if (movie.vote_average <= 3) {
            badgeClass = s.movieItemBadgeRed;
          } else if (movie.vote_average < 7) {
            badgeClass = s.movieItemBadgeOrange;
          } else if (movie.vote_average < 8) {
            badgeClass = s.movieItemBadgeYellow;
          } else if (movie.vote_average >= 8) {
            badgeClass = s.movieItemBadgeGreen;
          } else {
            badgeClass = s.movieItemBadgeRed;
          }
          return badgeClass;
        };

        return (
          <li key={movie.id} className={s.movieListItem}>
            <NavLink to={`/movies/${movie.id}`} state={location}>
              <div>
                <img src={imageUrl} alt={movie.title} />
              </div>
              <p className={s.movieItemTitle}>{movie.title}</p>
              {movie.vote_average != null &&
                movie.vote_average != undefined && (
                  <p className={checkRating()}>{movie.vote_average}</p>
                )}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};
export default MovieList;
