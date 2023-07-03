import axios from 'axios';

const API_URL = 'http://localhost:3000/api/stock/';

const createStock = async (data,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL + 'update_stock', data, config);

    return response.data;
}

const getAllStock = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'get_stock', config);

    return response.data;
}

const deleteStock = async (id,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + 'delete_stock_by_id/' + id, config);

    return response.data;
}

const updateStock = async (id,data,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.patch(API_URL + 'update_stock_by_id/' + id, data, config);
    return response.data;
}



const stockService = {
    createStock,
    getAllStock,
    deleteStock,
    updateStock
};

export default stockService;