import axios from 'axios';
import {API_URL} from "../utils/env";

const createStock = async (data,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL + 'api/stock/update_stock', data, config);

    return response.data;
}

const getAllStock = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'api/stock/get_stock', config);

    return response.data;
}

const deleteStock = async (id,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + 'api/stock/delete_stock_by_id/' + id, config);

    return response.data;
}

const updateStock = async (id,data,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.patch(API_URL + 'api/stock/update_stock_by_id/' + id, data, config);
    return response.data;
}



const stockService = {
    createStock,
    getAllStock,
    deleteStock,
    updateStock
};

export default stockService;