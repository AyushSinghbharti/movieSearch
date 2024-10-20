import { configureStore, createSlice } from '@reduxjs/toolkit';

const shortlistedSlice = createSlice({
    name: 'shortlisted',
    initialState: [],
    reducers: {
        addMovie: (state, action) => {
            state.push(action.payload);
        },
        removeMovie: (state, action) => {
            return state.filter(movie => movie.id !== action.payload.id);
        }
    }
});

export const { addMovie, removeMovie } = shortlistedSlice.actions;

const store = configureStore({
    reducer: {
        shortlisted: shortlistedSlice.reducer
    }
});

export default store;
