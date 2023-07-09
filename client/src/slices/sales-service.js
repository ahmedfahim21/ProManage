import axios from "axios";
import {API_URL} from "../utils/env";


const createSale = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL + "api/sales/update_sales", data, config);

    return response.data;
};

const getAllSales = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL + "api/sales/get_sales", config);
    return response.data;

};

const deleteSale = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.delete(API_URL + "api/sales/delete_sales_by_id/" + id, config);

    return response.data;
};




const salesService = {
    createSale,
    getAllSales,
    deleteSale,
};

export default salesService;