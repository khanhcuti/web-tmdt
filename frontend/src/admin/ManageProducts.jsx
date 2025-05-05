// src/admin/ManageProducts.jsx
import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
=======
import { NavLink } from 'react-router-dom';
>>>>>>> 4d166ce (test)
import Modal from 'react-modal';

Modal.setAppElement('#root');

<<<<<<< HEAD
const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
=======
// Thêm style cho Modal
const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
};

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
>>>>>>> 4d166ce (test)
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    stock: { S: 0, M: 0, L: 0, XL: 0 },
    images: [],
  });
<<<<<<< HEAD
=======
  const [editingProduct, setEditingProduct] = useState(null);
>>>>>>> 4d166ce (test)

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
<<<<<<< HEAD
      setNewProduct((prev) => ({ ...prev, images: [data] }));
=======
      const fullImagePath = `http://localhost:5000${data}`;
      setNewProduct((prev) => ({ ...prev, images: [fullImagePath] }));
>>>>>>> 4d166ce (test)
      alert('Upload ảnh thành công!');
    } catch (error) {
      console.error('Upload ảnh lỗi:', error);
      alert('Upload ảnh thất bại!');
    }
  };

<<<<<<< HEAD
  const handleAddProduct = async (e) => {
    e.preventDefault();
=======
  const handleEditImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.text();
      const fullImagePath = `http://localhost:5000${data}`;
      setEditingProduct((prev) => ({
        ...prev,
        images: [fullImagePath],
      }));
      alert('Upload ảnh thành công!');
    } catch (error) {
      console.error('Upload ảnh lỗi:', error);
      alert('Upload ảnh thất bại!');
    }
  };

  const getNextId = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products');
      const products = await res.json();
      const maxId = Math.max(...products.map(p => p._id));
      return maxId + 1;
    } catch (error) {
      console.error('Error getting next ID:', error);
      return null;
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    // Get next available ID
    const nextId = await getNextId();
    if (!nextId) {
      alert('Không thể tạo ID mới');
      return;
    }

    // Validate dữ liệu trước khi gửi
    if (!newProduct.name || !newProduct.images?.length || !newProduct.price) {
      alert('Vui lòng điền đầy đủ: Tên sản phẩm, Hình ảnh và Giá');
      return;
    }

    // Convert giá và số lượng sang number
    const productData = {
      _id: nextId,
      name: newProduct.name,
      images: newProduct.images,
      price: Number(newProduct.price),
      description: newProduct.description || '',
      category: newProduct.category || '',
      stock: {
        S: Number(newProduct.stock?.S) || 0,
        M: Number(newProduct.stock?.M) || 0,
        L: Number(newProduct.stock?.L) || 0,
        XL: Number(newProduct.stock?.XL) || 0
      }
    };

>>>>>>> 4d166ce (test)
    try {
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
<<<<<<< HEAD
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
=======
        body: JSON.stringify(productData)
      });

      if (!res.ok) {
        throw new Error('Lỗi thêm sản phẩm');
      }

      const savedProduct = await res.json();
      alert('Thêm sản phẩm thành công!');
      setIsAddModalOpen(false);
      
      // Reset form
      setNewProduct({
        name: '',
        price: '',
        description: '',
        category: '',
        stock: { S: 0, M: 0, L: 0, XL: 0 },
        images: []
      });
      
      // Refresh danh sách sản phẩm
      fetchProducts();
    } catch (err) {
      console.error('Add product error:', err);
      alert(err.message);
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/products/${editingProduct._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct),
      });

      if (res.ok) {
        alert('Cập nhật sản phẩm thành công!');
        setIsEditModalOpen(false);
        fetchProducts();
      } else {
        alert('Lỗi cập nhật sản phẩm!');
      }
    } catch (err) {
      console.error('Edit product error:', err);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${productId}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          alert('Xóa sản phẩm thành công!');
          fetchProducts();
        } else {
          alert('Lỗi xóa sản phẩm!');
        }
      } catch (err) {
        console.error('Delete product error:', err);
      }
    }
  };

  const menuItems = [
    { name: 'Trang chủ', path: '/admin/dashboard', icon: '🏠' },
    { name: 'Quản lý người dùng', path: '/admin/users', icon: '👥' },
    { name: 'Quản lý đơn hàng', path: '/admin/orders', icon: '🛒' },
    { name: 'Quản lý sản phẩm', path: '/admin/products', icon: '📦' },
  ];

  return (
    <div className="flex">
      {/* Sidebar - updated to match Dashboard */}
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

      {/* Content - updated margin to account for fixed sidebar */}
      <div className="flex-1 ml-64 bg-gray-100 p-6">
>>>>>>> 4d166ce (test)
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
<<<<<<< HEAD
=======
              <th className="py-2">Thao tác</th>
>>>>>>> 4d166ce (test)
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
<<<<<<< HEAD
                    <img src={`http://localhost:5000${p.images[0]}`} alt="ảnh" className="w-16 h-16 object-cover mx-auto" />
                  )}
                </td>
=======
                    <img 
                      src={p.images[0]}
                      alt={p.name}
                      className="w-16 h-16 object-cover mx-auto"
                    />
                  )}
                </td>
                <td className="py-2">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => {
                        setEditingProduct(p);
                        setIsEditModalOpen(true);
                      }}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      ✏️ Sửa
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(p._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      🗑️ Xóa
                    </button>
                  </div>
                </td>
>>>>>>> 4d166ce (test)
              </tr>
            ))}
          </tbody>
        </table>

<<<<<<< HEAD
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
=======
        {/* Modal Chỉnh sửa sản phẩm */}
        <Modal 
          isOpen={isEditModalOpen} 
          onRequestClose={() => setIsEditModalOpen(false)}
          style={customModalStyles}
          contentLabel="Chỉnh sửa sản phẩm"
        >
          <div className="relative">
            {/* Nút đóng ở góc phải */}
            <button 
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-0 right-0 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-6 text-center">Chỉnh sửa sản phẩm</h2>

            <form onSubmit={handleEditProduct} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Tên sản phẩm</label>
                <input
                  type="text"
                  value={editingProduct?.name || ''}
                  className="w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Hình ảnh</label>
                <input
                  type="file"
                  onChange={handleEditImage}
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Giá</label>
                <input
                  type="number"
                  value={editingProduct?.price || ''}
                  className="w-full border rounded-md p-2"
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                <textarea
                  value={editingProduct?.description || ''}
                  className="w-full border rounded-md p-2 min-h-[100px]"
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Danh mục</label>
                <input
                  type="text"
                  value={editingProduct?.category || ''}
                  className="w-full border rounded-md p-2"
                  onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Số lượng theo size</label>
                <div className="grid grid-cols-4 gap-2">
                  {['S', 'M', 'L', 'XL'].map((size) => (
                    <div key={size}>
                      <label className="block text-xs text-gray-500 mb-1">Size {size}</label>
                      <input
                        type="number"
                        value={editingProduct?.stock?.[size] || ''}
                        className="w-full border rounded-md p-2 text-sm"
                        onChange={(e) => setEditingProduct({
                          ...editingProduct,
                          stock: { ...editingProduct.stock, [size]: e.target.value }
                        })}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </Modal>

        {/* Modal Thêm sản phẩm */}
        <Modal 
          isOpen={isAddModalOpen} 
          onRequestClose={() => setIsAddModalOpen(false)}
          style={customModalStyles}
          contentLabel="Thêm sản phẩm"
        >
          <div className="relative">
            {/* Nút đóng ở góc phải */}
            <button 
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-0 right-0 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-6 text-center">Thêm sản phẩm mới</h2>

            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Tên sản phẩm</label>
                <input
                  type="text"
                  className="w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Hình ảnh</label>
                <input
                  type="file"
                  onChange={uploadFileHandler}
                  className="w-full border rounded-md p-2"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Giá</label>
                <input
                  type="number"
                  className="w-full border rounded-md p-2"
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                <textarea
                  className="w-full border rounded-md p-2 min-h-[100px]"
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Danh mục</label>
                <input
                  type="text"
                  className="w-full border rounded-md p-2"
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Số lượng theo size</label>
                <div className="grid grid-cols-4 gap-2">
                  {['S', 'M', 'L', 'XL'].map((size) => (
                    <div key={size}>
                      <label className="block text-xs text-gray-500 mb-1">Size {size}</label>
                      <input
                        type="number"
                        className="w-full border rounded-md p-2 text-sm"
                        onChange={(e) => setNewProduct({
                          ...newProduct,
                          stock: { ...newProduct.stock, [size]: e.target.value }
                        })}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Thêm sản phẩm
                </button>
              </div>
            </form>
          </div>
>>>>>>> 4d166ce (test)
        </Modal>

      </div>
    </div>
  );
};

export default ManageProducts;
