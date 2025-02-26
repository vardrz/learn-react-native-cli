import axios from "axios";
import api from "../constants/api";

const API_BASE_URL = api.url;

export const getCustomers = async (token) => {
    const response = await axios.get(`${API_BASE_URL}/api/customer`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    return response.data;
};

export const searchCustomers = async (token, body) => {
    const response = await axios.post(`${API_BASE_URL}/api/customer/search`, body, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    return response.data;
};

export const createCustomer = async (token, data) => {
    const response = await axios.post(`${API_BASE_URL}/api/customer`, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
    
    return response.data;
};

export const updateCustomer = async (token, id, data) => {
    const response = await axios.put(`${API_BASE_URL}/api/customer/${id}`, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
    
    return response.data;
};

export const deleteCustomer = async (token, id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/api/customer/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data; 
        } else {
            return { status: false, message: "Request failed", errors: error.message };
        }
    }
};