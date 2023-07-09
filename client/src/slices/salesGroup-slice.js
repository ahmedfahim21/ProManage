import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import salesGroupService from './salesGroup-service';

const initialState = {
    salesGroup: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
};


// Get all sales
export const getAllSalesGrouped = createAsyncThunk(
    'sales/get_sales_group',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;
            return await salesGroupService.getAllSalesGrouped(token);
        }
        catch (err) {
            return thunkAPI.rejectWithValue({error: err.message});
        }
    }
);


export const salesGroupSlice = createSlice({
    name: 'salesGroup',
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
            .addCase(getAllSalesGrouped.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllSalesGrouped.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.salesGroup = payload;
            })
            .addCase(getAllSalesGrouped.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isError = true;
                state.message = payload.error;
            })

    }
});



export const {reset} = salesGroupSlice.actions;

export default salesGroupSlice.reducer;




