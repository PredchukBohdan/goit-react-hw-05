import axios from "axios";

const api = axios.create({
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDdlYWZjMDRmYzI4MDJkZmQ1NDE4OGJlMjQxMGZkYiIsIm5iZiI6MTc0NDkxOTcwNy43MSwic3ViIjoiNjgwMTVjOWIyZTg5NThmMGY5OTk1Njg5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.JDB62XiJQ8gt0z855PhrgWy5acBy1rQJhG8szEwc8nc",
  },
});

const moviesData = async (type, page = 1, query, signal) => {
  let url = "";
  switch (type) {
    case "trending":
      url = `https://api.themoviedb.org/3/trending/movie/day?page=${page}`;
      break;
    case "search":
      url = `https://api.themoviedb.org/3/search/movie?query=${query}&page=${page}`;
      break;
    case "id":
      url = `https://api.themoviedb.org/3/movie/${query}`;
      break;
    case "cast":
      url = `https://api.themoviedb.org/3/movie/${query}/credits`;
      break;
    case "reviews":
      url = `https://api.themoviedb.org/3/movie/${query}/reviews?page=${page}`;
      break;
    default:
      url = `https://api.themoviedb.org/3/trending/movie/day`;
      break;
  }
  try {
    const response = await api.get(url, { params: signal });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export default moviesData;
