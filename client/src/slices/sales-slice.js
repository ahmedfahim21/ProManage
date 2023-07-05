import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import salesService from './sales-service';

const initialState = {
    sales: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
};

// Create sale
export const createSale = createAsyncThunk(
    'sales/update_sales',
    async (data, thunkAPI) => {
        try {
            const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;
            return await salesService.createSale(data,token);
        }
        catch (err) {
            return thunkAPI.rejectWithValue({error: err.message});
        }
    }
);

// Get all sales
export const getAllSales = createAsyncThunk(
    'sales/get_sales',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;
            return await salesService.getAllSales(token);
        }
        catch (err) {
            return thunkAPI.rejectWithValue({error: err.message});
        }
    }
);

// Delete sale
export const deleteSale = createAsyncThunk(
    'sales/delete_sales_by_id ',
    async (id, thunkAPI) => {
        try {
            const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;
            return await salesService.deleteSale(id,token);
        }
        catch (err) {
            return thunkAPI.rejectWithValue({error: err.message});
        }
    }
);




export const salesSlice = createSlice({
    name: 'sales',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createSale.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createSale.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.sales.push(action.payload);
            })
            .addCase(createSale.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.error;
            })
            .addCase(getAllSales.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllSales.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.sales = action.payload;
            })
            .addCase(getAllSales.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.error;
            })
            .addCase(deleteSale.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteSale.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.sales = state.sales.filter((sale) => sale._id !== action.payload._id);
            })
            .addCase(deleteSale.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.error;
            })


    }
});

export const {reset} = salesSlice.actions;

export default salesSlice.reducer;




