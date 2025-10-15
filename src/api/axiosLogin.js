import axios from 'axios';

const axiosLogin = axios.create({
    baseURL: 'http://localhost:8080', // Địa chỉ cơ sở cho các yêu cầu
    headers: {
        'Content-Type': 'application/json', // Đặt loại dữ liệu của yêu cầu là JSON
    },
});

// Thêm một interceptor cho yêu cầu
axiosLogin.interceptors.request.use(function (config) {
    // Thực hiện một số thao tác trước khi gửi yêu cầu
    return config;
}, function (error) {
    // Xử lý lỗi nếu xảy ra trong quá trình gửi yêu cầu
    return Promise.reject(error);
});

// Thêm một interceptor cho phản hồi
axiosLogin.interceptors.response.use(function (response) {
    // Xử lý dữ liệu phản hồi nếu mã trạng thái nằm trong khoảng 2xx
    return response;
}, function (error) {
    // Xử lý lỗi phản hồi nếu mã trạng thái nằm ngoài khoảng 2xx
    return Promise.reject(error);
});



export default axiosLogin;