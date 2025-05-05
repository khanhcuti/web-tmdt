import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Lấy danh sách sản phẩm
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new product
router.post('/', async (req, res) => {
  try {
<<<<<<< HEAD
    const { name, images, price, description, category, stock } = req.body;

    const newProduct = new Product({
      name,
      images, // Nhận array url ảnh
      price,
      description,
      category,
      stock,
=======
    const { _id, name, images, price, description, category, stock } = req.body;

    // Kiểm tra ID đã tồn tại chưa
    const existingProduct = await Product.findById(_id);
    if (existingProduct) {
      return res.status(400).json({ message: 'ID đã tồn tại' });
    }

    const newProduct = new Product({
      _id,
      name,
      images,
      price,
      description,
      category,
      stock
>>>>>>> 4d166ce (test)
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
<<<<<<< HEAD
    res.status(500).json({ message: 'Tạo sản phẩm thất bại' });
=======
    console.error('Create product error:', error);
    res.status(500).json({ 
      message: 'Tạo sản phẩm thất bại',
      error: error.message 
    });
>>>>>>> 4d166ce (test)
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Cập nhật sản phẩm thất bại' });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Xóa sản phẩm thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Xóa sản phẩm thất bại' });
  }
});

<<<<<<< HEAD
export default router;
=======
export default router;
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
});
>>>>>>> 4d166ce (test)
