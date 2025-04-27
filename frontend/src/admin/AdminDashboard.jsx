import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminDashboard = () => {
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
        <h1 className="text-3xl font-bold mb-8">Tổng quan</h1>

        {/* Các thống kê tổng quát */}
        <div className="grid grid-cols-4 gap-6 mb-10">
          <div className="bg-white shadow p-6 rounded">
            <h2 className="text-gray-500">Tổng số người dùng</h2>
            <p className="text-3xl font-bold mt-2 text-green-500">1</p>
          </div>
          <div className="bg-white shadow p-6 rounded">
            <h2 className="text-gray-500">Đơn hàng mới</h2>
            <p className="text-3xl font-bold mt-2 text-red-500">3</p>
          </div>
          <div className="bg-white shadow p-6 rounded">
            <h2 className="text-gray-500">Đơn đang giao</h2>
            <p className="text-3xl font-bold mt-2 text-blue-500">0</p>
          </div>
          <div className="bg-white shadow p-6 rounded">
            <h2 className="text-gray-500">Doanh thu hôm nay</h2>
            <p className="text-2xl font-bold mt-2 text-green-600">54,290,000 VNĐ</p>
          </div>
        </div>

        {/* Placeholder biểu đồ */}
        <div className="bg-white shadow p-6 rounded">
          <h2 className="text-xl font-semibold mb-4">Thống kê doanh thu và đơn hàng</h2>
          <div className="h-80 flex items-center justify-center text-gray-400">
            (Chỗ này sẽ thêm biểu đồ sau)
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
