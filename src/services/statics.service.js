import axios from 'axios'
import configAPI from "../configuration/apiConfig.json";

const getStatics = ({start, end}) => {
    return axios
        .get(configAPI.baseUrlApi + `/api/v1/order/homePage?start=${start}&end=${end}`)
        .then((response) => {
            return response.data
        });
};
const getStaticsHome = () => {
    return axios
        .get(configAPI.baseUrlApi + `/api/v1/order/homePage`)
        .then((response) => {
            return response.data
        });
};
export const StaticsService = {
    getStatics,
    getStaticsHome,
};