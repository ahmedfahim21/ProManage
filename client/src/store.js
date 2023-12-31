import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/auth-slice';
import { apiSlice } from './slices/api-slice';
import stocksReducer from './slices/stocks-slice';
import salesReducer from './slices/sales-slice';
import dailySalesReducer from './slices/dailySales-slice';
import expenseReducer from './slices/expense-slice';
import salesGroupReducer from './slices/salesGroup-slice';

const store = configureStore({
    reducer: {
        auth : authReducer,
        stocks: stocksReducer,
        sales: salesReducer,
        dailySales: dailySalesReducer,
        expenses: expenseReducer,
        salesGroup: salesGroupReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,

});

export default store; 