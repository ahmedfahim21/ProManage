import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import expenseService from './expense-service';

const initialState = {
    expenses: [],
    expensesbyCategory: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
};

// Create expense
export const createExpense = createAsyncThunk(
    'expenses/add_expense',
    async (data, thunkAPI) => {
        try {
            const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;
            return await expenseService.createExpense(data,token);
        }
        catch (err) {
            return thunkAPI.rejectWithValue({error: err.message});
        }
    }
);

// Get all expenses
export const GetAllExpenses = createAsyncThunk(
    'expenses/get_expenses',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;
            return await expenseService.getAllExpenses(token);
        }
        catch (err) {
            return thunkAPI.rejectWithValue({error: err.message});
        }
    }
);

// Delete expense
export const deleteExpense = createAsyncThunk(
    'expenses/delete_expense_by_id',
    async (id, thunkAPI) => {
        try {
            const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;
            return await expenseService.deleteExpense(id,token);
        }
        catch (err) {
            return thunkAPI.rejectWithValue({error: err.message});
        }
    }
);

// Get expenses by category
export const GetExpensesByCategory = createAsyncThunk(
    'expenses/get_expenses_by_category',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null; 
            return await expenseService.getExpensesByCategory(token);
        }
        catch (err) {
            return thunkAPI.rejectWithValue({error: err.message});
        }
    }
);





export const expenseSlice = createSlice({
    name: 'expenses',
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
            .addCase(createExpense.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createExpense.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.expenses.push(action.payload);
            })
            .addCase(createExpense.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.error;
            })
            .addCase(GetAllExpenses.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(GetAllExpenses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.expenses = action.payload;
            })
            .addCase(GetAllExpenses.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.error;
            })
            .addCase(deleteExpense.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteExpense.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.expenses = state.expenses.filter(expense => expense._id !== action.payload._id);
            })
            .addCase(deleteExpense.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.error;
            })
            .addCase(GetExpensesByCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(GetExpensesByCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.expensesbyCategory = action.payload;
            })
            .addCase(GetExpensesByCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.error;
            })

    }
});

export const {reset} = expenseSlice.actions;

export default expenseSlice.reducer;

