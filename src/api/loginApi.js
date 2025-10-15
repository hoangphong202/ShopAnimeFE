import axiosLogin from "./axiosLogin";


const loginApi = {
    login(username, password) {
        const url = `/home/login`;
        // Gửi username và password như là một phần của request body
        return axiosLogin.post(url, { username, password });
    },
};


export default loginApi;