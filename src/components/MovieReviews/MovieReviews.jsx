import s from "./MovieReviews.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moviesData from "../../api/films-api";
import { BeatLoader } from "react-spinners";

const loaderStyles = {
  display: "block",
  margin: "0 auto",
  width: "fit-content",
  padding: "20px 0",
};

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const { movieId } = useParams();
  const [error, setError] = useState(false);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await moviesData("reviews", 1, movieId);

        if (data.results.length === 0) {
          setEmpty(true);
        } else {
          setEmpty(false);
        }
        setReviews(data.results);
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
  }, [movieId]);

  const toggleContent = (e) => {
    const target = e.target;
    const item = target?.parentElement;
    const content = item?.querySelector(".content");

    const isExpanded = content?.classList.toggle(s.expanded);

    if (isExpanded) {
      target.textContent = "Less";
    } else {
      target.textContent = "More";
    }
  };

  return (
    <div className={s.reviews}>
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
      {!error && !loading && reviews.length === 0 && empty && (
        <div className={s.empty}>No reviews found</div>
      )}
      {reviews.length > 0 && !empty && !loading && (
        <>
          <h2 className={s.title}>Reviews</h2>
          <ul className={s.reviewsList}>
            {reviews.map((review) => {
              const date = new Date(review.created_at).toLocaleDateString(
                "en-GB",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              );

              return (
                <li key={review.id} className={s.reviewsItem}>
                  <div className={s.reviewsItemTop}>
                    <h2>{review.author}</h2>
                    <p>{date}</p>
                  </div>
                  <p className={s.rating}>
                    <span>Rating:</span> {review.author_details.rating}
                  </p>
                  {review.content && (
                    <p className={`${s.reviewContent} content`}>
                      {review.content}
                    </p>
                  )}
                  <button
                    className={s.button}
                    onClick={(e) => toggleContent(e)}
                  >
                    More
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};
export default MovieReviews;
