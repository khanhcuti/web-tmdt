import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  product: {
    type: Number,
    //ref: 'Product',       // Tham chiếu đến _id của sản phẩm trong collection Product:contentReference[oaicite:2]{index=2}
    required: true,
  },
  size: {
    type: String,         // Kích cỡ của sản phẩm (ví dụ: "S", "M", "L", ...)
    required: true,
  },
  quantity: {
    type: Number,         // Số lượng sản phẩm trong giỏ
    required: true,
    min: 1,               // Đảm bảo số lượng ít nhất là 1
    default: 1,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',         // Tham chiếu đến _id của người dùng trong collection User
    required: false,
  },
  sessionId: {
    type: String,
    required: false,
  },
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
