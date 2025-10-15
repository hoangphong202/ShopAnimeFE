import React, { useState } from 'react';
import InputField from '../../components/InputField/InputField';
import { useNavigate } from 'react-router-dom';
import loginApi from '../../api/loginApi';

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await loginApi.login(username, password);
            console.log('Full response:', response); // Log toàn bộ phản hồi

            if (response.token) {
                localStorage.setItem('token', response.data.token);
                console.log('Token stored:', localStorage.getItem('token'));
            }

            // Lấy vai trò người dùng và điều hướng dựa trên vai trò đó
            const userRole = response.data.data.role; // Giả sử role được trả về như một trường trong response.data

            if (userRole === 'ADMIN') {
                navigate('/home');
            } else if (userRole === 'USER') {
                navigate('/home');
            } else {
                console.error('Role not recognized or user not authorized');
            }

        } catch (error) {
            console.error('Login request failed:', error.response || error.message);
        }
    };


    return (
        <form className="login-form" onSubmit={handleLogin}>
            <h2>Đăng nhập</h2>
            <InputField
                label="Tài khoản"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tài khoản..."
            />
            <InputField
                label="Mật khẩu"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu..."
            />



            <button type="submit">Đăng nhập</button>
        </form>
    );
}
export default LoginForm;