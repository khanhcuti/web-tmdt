<<<<<<< HEAD
import React from 'react';
import { NavLink } from 'react-router-dom';

const ManageOrders = () => {
=======
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
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
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/orders');
        if (!res.ok) throw new Error('Không thể tải dữ liệu đơn hàng');
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!res.ok) throw new Error('Cập nhật trạng thái thất bại');

      // Refresh orders list
      const updatedOrders = orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);
    } catch (err) {
      alert(err.message);
    }
  };

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
        <h1 className="text-3xl font-bold mb-8">Quản lý đơn hàng</h1>
<<<<<<< HEAD
        {/* Nội dung sau này thêm: bảng đơn hàng */}
=======

        {loading ? (
          <div className="text-center">Đang tải...</div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mã đơn hàng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Khách hàng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày đặt
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tổng tiền
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phương thức thanh toán
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order._id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.customerName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.total.toLocaleString()}đ
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.paymentMethod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${order.status === 'Đã hủy' ? 'bg-red-100 text-red-800' : 
                          order.status === 'Chờ xác nhận' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <button 
                        onClick={() => window.location.href = `/admin/orders/${order._id}`}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Xem chi tiết
                      </button>
                      {order.status === 'Chờ xác nhận' && (
                        <>
                          <button
                            onClick={() => handleUpdateStatus(order._id, 'Đã giao hàng')}
                            className="text-green-600 hover:text-green-900 mr-4"
                          >
                            Xác nhận
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(order._id, 'Đã hủy')}
                            className="text-red-600 hover:text-red-900"
                          >
                            Hủy
                          </button>
                        </>
                      )}
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

export default ManageOrders;
