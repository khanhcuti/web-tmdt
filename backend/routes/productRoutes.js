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
    const { name, images, price, description, category, stock } = req.body;

    const newProduct = new Product({
      name,
      images, // Nhận array url ảnh
      price,
      description,
      category,
      stock,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Tạo sản phẩm thất bại' });
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

export default router;