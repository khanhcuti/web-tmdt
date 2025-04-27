import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const ADMIN_USERNAME = 'admin';
    const ADMIN_PASSWORD = 'admin123';

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem('admin_token', 'admin_logged_in');
      navigate('/admin/dashboard');
    } else {
      alert('Sai tài khoản hoặc mật khẩu Admin!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-[90%] sm:max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input 
            type="text" 
            placeholder="Tên đăng nhập" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border rounded"
            required 
          />
          <input 
            type="password" 
            placeholder="Mật khẩu" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded"
            required 
          />
          <button type="submit" className="bg-black text-white py-2 rounded">Đăng nhập</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
