import axios from 'axios';

const Axios = axios.create({
    baseURL: 'http://localhost:8080', // Địa chỉ cơ sở cho các yêu cầu
});


// Interceptor để tự động thêm token vào các yêu cầu
Axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Hàm gửi yêu cầu sử dụng JSON
export const sendJsonRequest = async (url, data) => {
    try {
        const response = await Axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Hàm gửi yêu cầu sử dụng form-data
export const sendFormDataRequest = async (url, data) => {
    try {
        const response = await Axios.post(url, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Hàm gửi yêu cầu sử dụng form-data
export const sendFormDataRequestDelete = async (url, data) => {
    try {
        const response = await Axios.delete(url, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default Axios;
