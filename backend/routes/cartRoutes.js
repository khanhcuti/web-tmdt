import express from 'express';
import asyncHandler from 'express-async-handler';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

const router = express.Router();

// @desc    Thêm sản phẩm vào giỏ hàng
// @route   POST /api/cart
// @access  Public
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { product, quantity, size, sessionId, user } = req.body;

    if (product === undefined || quantity === undefined || !size) {
      res.status(400);
      throw new Error('Thiếu thông tin sản phẩm');
    }

    const existingItem = await Cart.findOne({
      product,
      size,
      ...(user ? { user } : { sessionId }),
    });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      res.status(200).json(existingItem);
    } else {
      const newItem = new Cart({
        product,
        quantity,
        size,
        ...(user ? { user } : { sessionId }),
      });
      const createdItem = await newItem.save();
      res.status(201).json(createdItem);
    }
  })
);

// @desc    Lấy danh sách giỏ hàng
// @route   GET /api/cart
// @access  Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { sessionId, userId } = req.query;

    if (!sessionId && !userId) {
      res.status(400);
      throw new Error('Thiếu sessionId hoặc userId');
    }

    const query = sessionId ? { sessionId } : { user: userId };
    const items = await Cart.find(query);

    const populatedItems = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.product);
        if (!product) return null;

        return {
          _id: item._id,
          product: item.product,
          name: product.name,
          image: product.images[0],
          price: product.price,
          quantity: item.quantity,
          size: item.size,
        };
      })
    );

    const validItems = populatedItems.filter(item => item !== null);
    res.json(validItems);
  })
);

// Cập nhật số lượng
router.put('/:id', asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const item = await Cart.findById(req.params.id);
  if (item) {
    item.quantity = quantity;
    await item.save();
    res.json(item);
  } else {
    res.status(404);
    throw new Error('Không tìm thấy mục giỏ hàng');
  }
}));

// Xoá sản phẩm
router.delete('/:id', asyncHandler(async (req, res) => {
  const item = await Cart.findById(req.params.id);
  if (item) {
    await item.deleteOne();
    res.json({ message: 'Đã xoá sản phẩm khỏi giỏ hàng' });
  } else {
    res.status(404);
    throw new Error('Không tìm thấy mục giỏ hàng');
  }
}));
// @desc    Xóa toàn bộ giỏ hàng
// @route   DELETE /api/cart/clear
// @access  Public
router.delete('/clear', asyncHandler(async (req, res) => {
  const { userId, sessionId } = req.body;

  if (!userId && !sessionId) {
    res.status(400);
    throw new Error('Thiếu userId hoặc sessionId');
  }

  const query = userId ? { user: userId } : { sessionId };
  await Cart.deleteMany(query);

  res.json({ message: 'Đã xóa toàn bộ giỏ hàng' });
}));
export default router;
