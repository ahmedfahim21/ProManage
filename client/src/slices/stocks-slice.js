import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import stockService from './stocks-service';

const initialState = {
    stocks: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
};

// Create stock
export const createStock = createAsyncThunk(
    'stock/update_stocks',
    async (data, thunkAPI) => {
        try {
            const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;
            return await stockService.createStock(data,token);
        }
        catch (err) {
            return thunkAPI.rejectWithValue({error: err.message});
        }
    }
);

// Get all stock
export const getAllStock = createAsyncThunk(
    'stock/get_stock',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;
            return await stockService.getAllStock(token);
        }
        catch (err) {
            return thunkAPI.rejectWithValue({error: err.message});
        }
    }
);

// Delete stock
export const deleteStock = createAsyncThunk(
    'stock/delete_stock_by_id ',
    async (id, thunkAPI) => {
        try {
            const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;
            return await stockService.deleteStock(id,token);
        }
        catch (err) {
            return thunkAPI.rejectWithValue({error: err.message});
        }
    }
);

// Update stock
export const updateStock = createAsyncThunk(
    'stock/update_stock_by_id ',
    async (recv, thunkAPI) => {
        try {
            const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;
            return await stockService.updateStock(recv.id,recv.data,token);
        }
        catch (err) {
            return thunkAPI.rejectWithValue({error: err.message});
        }
    }
);


export const stocksSlice = createSlice({
    name: 'stocks',
    initialState,
    reducers: {
        reset: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createStock.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createStock.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.stocks.push(action.payload);
            })
            .addCase(createStock.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.error;
            })
            .addCase(getAllStock.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllStock.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.stocks = action.payload;
            })
            .addCase(getAllStock.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.error;
            })
            .addCase(deleteStock.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteStock.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.stocks = state.stocks.filter(stock => stock._id !== action.payload._id);
            })
            .addCase(deleteStock.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.error;
            })    
            .addCase(updateStock.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateStock.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.stocks = state.stocks.map(stock => {
                    if(stock._id === action.payload._id){
                        return action.payload;
                    }
                    return stock;
                });
            }
            )
            .addCase(updateStock.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.error;
            })

    }
});

export const {reset} = stocksSlice.actions;

export default stocksSlice.reducer;

