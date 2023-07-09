import axios from 'axios';

const API_URL = 'http://localhost:3000/api/expenses/';

const createExpense = async (data,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL + 'add_expense', data, config);

    return response.data;
}

const getAllExpenses = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'get_expenses', config);

    return response.data;
}

const deleteExpense = async (id,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + 'delete_expense_by_id/' + id, config);

    return response.data;
}

const getExpensesByCategory = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'get_expenses_by_category', config);
    return response.data;
}


const expenseService = {
    createExpense,
    getAllExpenses,
    deleteExpense,
    getExpensesByCategory
};

export default expenseService;