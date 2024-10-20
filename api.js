import axios from 'axios';

const API_KEY = 'ef4ca97c';
const BASE_URL = 'http://www.omdbapi.com';

export const fetchMovies = async () => {
    const response = await axios.get(`${BASE_URL}/?s=movie&apikey=${API_KEY}`);
    return response.data.Search;
};

export const SearchMovies = async (searchTerm) => {
    const response = await axios.get(`${BASE_URL}/?s=${searchTerm}&apikey=${API_KEY}`);
    return response.data.Search;
}