<<<<<<< HEAD
import React from 'react';
import { NavLink } from 'react-router-dom';

const ManageUsers = () => {
=======
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

>>>>>>> 4d166ce (test)
  const menuItems = [
    { name: 'Trang chủ', path: '/admin/dashboard', icon: '🏠' },
    { name: 'Quản lý người dùng', path: '/admin/users', icon: '👥' },
    { name: 'Quản lý đơn hàng', path: '/admin/orders', icon: '🛒' },
    { name: 'Quản lý sản phẩm', path: '/admin/products', icon: '📦' },
  ];

<<<<<<< HEAD
=======
  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        
        // Kiểm tra nếu không có token
        if (!token) {
          throw new Error('Không tìm thấy token admin');
        }

        const res = await fetch('http://localhost:5000/api/users/all', {
          headers: {
            'Authorization': `Bearer ${token}`, // Thêm 'Bearer ' vào trước token
            'Content-Type': 'application/json'
          }
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Failed to fetch users');
        }

        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
        console.error('Fetch users error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

>>>>>>> 4d166ce (test)
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
<<<<<<< HEAD
        {/* Nội dung sau này thêm: bảng user */}
=======
        
        {loading ? (
          <div className="text-center">Đang tải...</div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Số điện thoại
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Giới tính
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày sinh
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {user.username}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.phone || 'Chưa cập nhật'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.gender || 'Chưa cập nhật'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.birthday ? new Date(user.birthday).toLocaleDateString() : 'Chưa cập nhật'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          if (window.confirm('Bạn có chắc muốn xóa người dùng này?')) {
                            // Thêm logic xóa user sau khi có API
                          }
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
>>>>>>> 4d166ce (test)
      </div>
    </div>
  );
};

export default ManageUsers;
