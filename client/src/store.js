import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/auth-slice';
import { apiSlice } from './slices/api-slice';
import stocksReducer from './slices/stocks-slice';

const store = configureStore({
    reducer: {
        auth : authReducer,
        stocks: stocksReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,

});

export default store; 