import axios from "axios";

const API_KEY = process.env.EXPO_PUBLIC_OMDB_API_KEY;
const BASE_URL = process.env.EXPO_PUBLIC_OMDB_BASE_URL;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export const fetchMovies = async () => {
  const currentYear = new Date().getFullYear();
  const response1 = await axios.get(`${BASE_URL}/?s=movie&apikey=${API_KEY}`);
  const allMovies = response1.data.Search || [];
  const response2 = await axios.get(
    `${BASE_URL}/?s=movie&y=${currentYear}&apikey=${API_KEY}`
  );
  const latestMovies = response2.data.Search || [];

  const combinedMovies = [...latestMovies, ...allMovies];

  await delay(1000);
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
  
  await delay(1000);
  return response.data;
};
