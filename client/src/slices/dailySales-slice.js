import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import dailySalesService from './dailySales-service';

const initialState = {
    dailySales: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
};


// Get all dailySales
export const getAllDailySales = createAsyncThunk(
    'daily_sales/get_daily_sales',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;
            return await dailySalesService.getAllDailySales(token);
        }
        catch (err) {
            return thunkAPI.rejectWithValue({error: err.message});
        }
    }
);


export const dailySalesSlice = createSlice({
    name: 'dailySales',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getAllDailySales.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllDailySales.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.dailySales = payload;
            })
            .addCase(getAllDailySales.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isError = true;
                state.message = payload.error;
            })

    }
});

export const { reset } = dailySalesSlice.actions;

export default dailySalesSlice.reducer;



