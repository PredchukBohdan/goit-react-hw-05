import { Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import "./App.css";
import { BeatLoader } from "react-spinners";
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("../../pages/MovieDetailsPage/MovieDetailsPage")
);
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);
const MovieCast = lazy(() => import("../MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews"));
const Layout = lazy(() => import("../Layout/Layout"));

const loaderStyles = {
  display: "block",
  margin: "0 auto",
  width: "fit-content",
  padding: "20px 0",
};

function App() {
  return (
    <>
      <Suspense
        fallback={
          <BeatLoader
            color="#4d02b9"
            loading="true"
            className="loader"
            cssOverride={loaderStyles}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        }
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="movies" element={<MoviesPage />} />
            <Route path="movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
