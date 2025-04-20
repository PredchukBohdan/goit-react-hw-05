import s from "./MovieCast.module.css";
import moviesData from "../../api/films-api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import imagePlaceholder from "../../images/image-placeholder.svg";

const loaderStyles = {
  display: "block",
  margin: "0 auto",
  width: "fit-content",
  padding: "20px 0",
};

const MovieCast = () => {
  const [moviesCast, setMoviesCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const { movieId } = useParams();
  const [error, setError] = useState(false);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await moviesData("cast", 1, movieId);
        if (data.cast.length === 0) {
          setEmpty(true);
        } else {
          setEmpty(false);
        }
        setMoviesCast(data.cast);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    const timeout = setTimeout(() => {
      getMovies();
    }, 200);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className={s.cast}>
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
      {!error && !loading && moviesCast.length === 0 && empty && (
        <div className={s.empty}>No actors found</div>
      )}
      {moviesCast.length > 0 && !empty && !loading && (
        <>
          <h2 className={s.title}>Cast</h2>

          <ul className={s.list}>
            {moviesCast.map((actor) => {
              const actorPhoto = actor.profile_path
                ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                : imagePlaceholder;

              return (
                <li className={s.item} key={actor.cast_id || actor.credit_id}>
                  <img
                    className={s.photo}
                    width="100"
                    src={actorPhoto}
                    alt={actor.original_name}
                  />
                  <p className={s.text}>{actor.original_name}</p>
                  <span className={s.span}>as</span>
                  <p className={s.text}>{actor.character}</p>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};
export default MovieCast;
