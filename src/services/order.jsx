import axios from "axios";
import api from "../constants/api";

const API_BASE_URL = api.url;

export const AllOrder = async (token) => {
    const response = await axios.get(`${API_BASE_URL}/api/order`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    return response.data;
};

export const GetOrderByNumber = async (token, number) => {
    const response = await axios.get(`${API_BASE_URL}/api/order/find/${number}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.data.status) {
        return [response.data.data];
    }

    return null
};

export const InsertOrder = async (token, body) => {
    const response = await axios.post(`${API_BASE_URL}/api/order`, body, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    return response.data;
};

export const UpdateOrder = async (token, id, body) => {
    const response = await axios.put(`${API_BASE_URL}/api/order/${id}`, body, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    return response.data;
};