import axios from "axios";
import {API_URL} from "../utils/env";

const getAllSalesGrouped = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL + "api/sales/get_sales_group", config);

    return response.data;

};


const salesGroupService = {
    getAllSalesGrouped,
};

export default salesGroupService;