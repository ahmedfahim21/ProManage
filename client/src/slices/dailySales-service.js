import axios from "axios";
import {API_URL} from "../utils/env";


const getAllDailySales = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL + "api/daily_sales/get_daily_sales", config);
    return response.data;

}


const dailySalesService = {
    getAllDailySales,
};  

export default dailySalesService;