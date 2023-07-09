import axios from 'axios';
import {API_URL} from "../utils/env";

const createExpense = async (data,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL + 'api/expenses/add_expense', data, config);

    return response.data;
}

const getAllExpenses = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'api/expenses/get_expenses', config);

    return response.data;
}

const deleteExpense = async (id,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + 'api/expenses/delete_expense_by_id/' + id, config);

    return response.data;
}

const getExpensesByCategory = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'api/expenses/get_expenses_by_category', config);
    return response.data;
}


const expenseService = {
    createExpense,
    getAllExpenses,
    deleteExpense,
    getExpensesByCategory
};

export default expenseService;