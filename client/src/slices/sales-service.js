import axios from "axios";

const API_URL = "http://localhost:3000/api/sales/";

const createSale = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL + "update_sales", data, config);

    return response.data;
};

const getAllSales = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL + "get_sales", config);
    return response.data;

};

const deleteSale = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.delete(API_URL + "delete_sales_by_id/" + id, config);

    return response.data;
};




const salesService = {
    createSale,
    getAllSales,
    deleteSale,
};

export default salesService;