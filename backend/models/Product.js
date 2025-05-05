import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
<<<<<<< HEAD
=======
  _id: { type: Number, required: true },
>>>>>>> 4d166ce (test)
  name: { type: String, required: true },
  images: [{ type: String, required: true }], // Ảnh, array nhiều ảnh
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String },
  stock: {
    S: { type: Number, default: 0 },
    M: { type: Number, default: 0 },
    L: { type: Number, default: 0 },
    XL: { type: Number, default: 0 },
  },
}, { timestamps: true });


const Product = mongoose.model('Product', productSchema);

export default Product;
