import {configureStore} from '@reduxjs/toolkit';
import moviesReducer from './reducer/moviesSlice';

export const store = configureStore({
    reducer: {
        movies : moviesReducer,
    }
})