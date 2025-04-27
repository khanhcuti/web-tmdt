import React from 'react';
import { NavLink } from 'react-router-dom';

const ManageUsers = () => {
  const menuItems = [
    { name: 'Trang chủ', path: '/admin/dashboard', icon: '🏠' },
    { name: 'Quản lý người dùng', path: '/admin/users', icon: '👥' },
    { name: 'Quản lý đơn hàng', path: '/admin/orders', icon: '🛒' },
    { name: 'Quản lý sản phẩm', path: '/admin/products', icon: '📦' },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="h-screen w-64 bg-blue-900 text-white flex flex-col p-5 fixed">
        <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded hover:bg-blue-700 ${
                  isActive ? 'bg-blue-700' : ''
                }`
              }
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 ml-64 p-10 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-8">Quản lý người dùng</h1>
        {/* Nội dung sau này thêm: bảng user */}
      </div>
    </div>
  );
};

export default ManageUsers;
