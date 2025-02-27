import axios from "axios";
import api from "../constants/api";

const API_BASE_URL = api.url;

export const sendNotif = async (token, body) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/notif`, body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        return response.data;
    } catch (err) {
        return "Gagal mengirim notifikasi";
    }
};