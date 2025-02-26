import axios from "axios";
import api from "../constants/api";

const API_BASE_URL = api.url;

export const searchProduct = async (token, body) => {
    const response = await axios.post(`${API_BASE_URL}/api/products/cari`, body, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    return response.data;
};

export const createProduct = async (token, data) => {
    const response = await axios.post(`${API_BASE_URL}/api/products`, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
    
    return response.data;
};

export const updateProduct = async (token, id, data) => {
    const response = await axios.put(`${API_BASE_URL}/api/products/${id}`, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
    
    return response.data;
};

export const deleteProduct = async (token, id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/api/products/${id}`, {
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