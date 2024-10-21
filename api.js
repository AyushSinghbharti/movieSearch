import axios from "axios";

// const API_KEY = "ef4ca97c";
// const API_KEY = process.env.OMDB_API_KEY;
const API_KEY = process.env.EXPO_PUBLIC_OMDB_API_KEY;
// const BASE_URL = "http://www.omdbapi.com";
const BASE_URL = process.env.EXPO_PUBLIC_OMDB_BASE_URL;

export const fetchMovies = async () => {
  const currentYear = new Date().getFullYear();
  const response1 = await axios.get(`${BASE_URL}/?s=movie&apikey=${API_KEY}`);
  const allMovies = response1.data.Search || [];
  const response2 = await axios.get(
    `${BASE_URL}/?s=movie&y=${currentYear}&apikey=${API_KEY}`
  );
  const latestMovies = response2.data.Search || [];

  const combinedMovies = [...latestMovies, ...allMovies];
  return combinedMovies;
};

export const SearchMovies = async (searchTerm) => {
  const response = await axios.get(
    `${BASE_URL}/?s=${searchTerm}&apikey=${API_KEY}`
  );
  return response.data.Search;
};

export const FetchDetail = async (imdbId) => {
  const response = await axios.get(
    `${BASE_URL}/?i=${imdbId}&apikey=${API_KEY}`
  );
  return response.data;
};
