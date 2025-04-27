// src/admin/ManageProducts.jsx
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    stock: { S: 0, M: 0, L: 0, XL: 0 },
    images: [],
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Fetch products error:', err);
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.text();
      setNewProduct((prev) => ({ ...prev, images: [data] }));
      alert('Upload ảnh thành công!');
    } catch (error) {
      console.error('Upload ảnh lỗi:', error);
      alert('Upload ảnh thất bại!');
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      if (res.ok) {
        alert('Thêm sản phẩm thành công!');
        setIsAddModalOpen(false);
        fetchProducts();
      } else {
        alert('Lỗi thêm sản phẩm!');
      }
    } catch (err) {
      console.error('Add product error:', err);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white min-h-screen p-4">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <ul className="space-y-4">
          <li><a href="/admin/dashboard">Trang chủ</a></li>
          <li><a href="/admin/users">Quản lý người dùng</a></li>
          <li><a href="/admin/orders">Quản lý đơn hàng</a></li>
          <li><a href="/admin/products" className="font-bold">Quản lý sản phẩm</a></li>
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 bg-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Sản phẩm</h2>
          <button onClick={() => setIsAddModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
            Thêm sản phẩm
          </button>
        </div>

        <table className="min-w-full bg-white rounded">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2">ID</th>
              <th className="py-2">Tên sản phẩm</th>
              <th className="py-2">Giá</th>
              <th className="py-2">Ảnh</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => (
              <tr key={p._id} className="text-center">
                <td className="py-2">{index + 1}</td>
                <td className="py-2">{p.name}</td>
                <td className="py-2">{p.price} đ</td>
                <td className="py-2">
                  {p.images && p.images[0] && (
                    <img src={`http://localhost:5000${p.images[0]}`} alt="ảnh" className="w-16 h-16 object-cover mx-auto" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal Thêm sản phẩm */}
        <Modal isOpen={isAddModalOpen} onRequestClose={() => setIsAddModalOpen(false)} contentLabel="Thêm sản phẩm">
          <h2 className="text-xl font-bold mb-4">Thêm sản phẩm</h2>
          <form onSubmit={handleAddProduct} className="flex flex-col gap-4">
            <input type="text" placeholder="Tên sản phẩm" className="border p-2" onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} required />
            <input type="file" onChange={uploadFileHandler} className="border p-2" required />
            <input type="number" placeholder="Giá" className="border p-2" onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} required />
            <textarea placeholder="Mô tả" className="border p-2" onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}></textarea>
            <input type="text" placeholder="Danh mục" className="border p-2" onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} />
            <div className="grid grid-cols-2 gap-2">
              <input type="number" placeholder="Size S" className="border p-2" onChange={(e) => setNewProduct({ ...newProduct, stock: { ...newProduct.stock, S: e.target.value } })} />
              <input type="number" placeholder="Size M" className="border p-2" onChange={(e) => setNewProduct({ ...newProduct, stock: { ...newProduct.stock, M: e.target.value } })} />
              <input type="number" placeholder="Size L" className="border p-2" onChange={(e) => setNewProduct({ ...newProduct, stock: { ...newProduct.stock, L: e.target.value } })} />
              <input type="number" placeholder="Size XL" className="border p-2" onChange={(e) => setNewProduct({ ...newProduct, stock: { ...newProduct.stock, XL: e.target.value } })} />
            </div>
            <div className="flex justify-end gap-4">
              <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 bg-gray-400 text-white rounded">
                Đóng
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                Thêm
              </button>
            </div>
          </form>
        </Modal>

      </div>
    </div>
  );
};

export default ManageProducts;
