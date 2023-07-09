import axios from "axios";

const API_URL = "http://localhost:3000/api/sales/";


const getAllSalesGrouped = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL + "get_sales_group", config);

    return response.data;

};


const salesGroupService = {
    getAllSalesGrouped,
};

export default salesGroupService;