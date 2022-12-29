import axios from "axios";
import configAPI from "../configuration/apiConfig.json";

const createOrder = (order) => {
    console.log(order);
    return axios
        .post(configAPI.baseUrlApi + "/api/v1/order", order)
        .then((response) => {
            return response.data;
        });
};

const getOrderById = (id) => {
    return axios
        .get(configAPI.baseUrlApi + "/api/v1/order/" + id)
        .then((response) => {
            return response;
        });
};

const updateOrder = (id, order) => {
    return axios
        .put(configAPI.baseUrlApi + "/api/v1/order/" + id, order)
        .then((response) => {
            return response.data;
        });
};

const updateStatusOrder = (id, order) => {
    return axios
        .put(configAPI.baseUrlApi + "/api/v1/order/approve/" + id, order)
        .then((response) => {
            return response.data;
        });
};

const updateStatusOrderReady = (id, order) => {
    return axios
        .put(configAPI.baseUrlApi + "/api/v1/order/readyToShip/" + id, order)
        .then((response) => {
            return response.data;
        });
};

const updateStatusOrderTransport = (id, order) => {
    return axios
        .put(configAPI.baseUrlApi + "/api/v1/order/transport/" + id, order)
        .then((response) => {
            return response.data;
        });
};

const updateStatusOrderComplete = (id, order) => {
    return axios
        .put(configAPI.baseUrlApi + "/api/v1/order/complete/" + id, order)
        .then((response) => {
            return response.data;
        });
};

const updateStatusOrderCancel = (id, order) => {
    return axios
        .put(configAPI.baseUrlApi + "/api/v1/order/cancel/" + id, order)
        .then((response) => {
            return response.data;
        });
};

const deleteOrder = (id) => {
    console.log(id);
    return axios
        .delete(configAPI.baseUrlApi + "/api/v1/order/" + id)
        .then((response) => {
            return response.data;
        });
};

const getAllOrder = () => {
    return axios.get(configAPI.baseUrlApi + "/api/v1/order").then((response) => {
        console.log(response);

        return response.data;
    });
};
const userinfo = JSON.parse(localStorage.getItem("username"));
const getlistShip = () => {
    return axios
        .get(configAPI.baseUrlApi + "/api/v1/order/listOrderShipper", {
            headers: {
                userId: userinfo ? userinfo.uid : null,
            },
        })
        .then((response) => {
            console.log(response);
            return response.data;
        });
};

export const OrderService = {
    getAllOrder,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    updateStatusOrder,
    updateStatusOrderReady,
    getlistShip,
    updateStatusOrderTransport,
    updateStatusOrderComplete,
    updateStatusOrderCancel,
};