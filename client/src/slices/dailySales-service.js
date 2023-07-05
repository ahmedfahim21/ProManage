import axios from "axios";

const API_URL = "http://localhost:3000/api/daily_sales/";

const getAllDailySales = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL + "get_daily_sales", config);
    return response.data;

}


const dailySalesService = {
    getAllDailySales,
};  

export default dailySalesService;