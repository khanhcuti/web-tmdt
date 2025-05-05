import dotenv from 'dotenv';
dotenv.config(); 
import mongoose from 'mongoose';
import Product from './models/Product.js';

// Kết nối tới MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Dữ liệu sản phẩm mẫu
const products = [
  { 
    _id: 1,
    name: 'Áo CLB Manchester United mùa giải 00-01',
    images: ['http://localhost:5000/uploads/00_01_MNU.jpg'],
    price: 200000,
    description: 'Áo CLB Manchester United mùa giải 00-01 chất liệu cotton cao cấp.',
    category: 'MNU',
    stock: { S: 10, M: 15, L: 20, XL: 5 },
  },
  { 
    _id: 2,
    name: 'Áo CLB Manchester United mùa giải 07-08',
    images: ['http://localhost:5000/uploads/07_08_MNU.jpg'],
    price: 350000,
    description: 'Áo CLB Manchester United mùa giải 07-08 chất liệu cotton cao cấp.',
    category: 'MNU',
    stock: { S: 5, M: 10, L: 8, XL: 2 },
  },
  { 
    _id: 3,
    name: 'Áo CLB Manchester United mùa giải 25-26',
    images: ['http://localhost:5000/uploads/25_26_MNU.jpg'],
    price: 300000,
    description: 'Áo CLB Manchester United mùa giải 25-26 chất liệu cotton cao cấp.',
    category: 'MNU',
    stock: { S: 0, M: 10, L: 15, XL: 10 },
  },
  { 
    _id: 4,
    name: 'Áo CLB Manchester United mùa giải 25-26 BẢN BLACK',
    images: ['http://localhost:5000/uploads/25_26_MNU_black.jpg'],
    price: 250000,
    description: 'Áo CLB Manchester United mùa giải 25-26 chất liệu cotton cao cấp.',
    category: 'MNU',
    stock: { S: 0, M: 10, L: 15, XL: 10 },
  },
  { 
    _id: 5,
    name: 'Áo CLB Manchester United mùa giải 25-26 BẢN BLUE',
    images: ['http://localhost:5000/uploads/25_26_MNU_blue.png'],
    price: 200000,
    description: 'Áo CLB Manchester United mùa giải 25-26 chất liệu cotton cao cấp.',
    category: 'MNU',
    stock: { S: 0, M: 10, L: 15, XL: 10 },
  },
  { 
    _id: 6,
    name: 'Áo CLB Manchester United mùa giải 25-26 BẢN WHITE RED',
    images: ['http://localhost:5000/uploads/25_26_MNU_whitered.jpg'],
    price: 250000,
    description: 'Áo CLB Manchester United mùa giải 25-26 chất liệu cotton cao cấp.',
    category: 'MNU',
    stock: { S: 0, M: 10, L: 15, XL: 10 },
  },
  { 
    _id: 7,
    name: 'Áo CLB Arsenal mùa giải 19-20',
    images: ['http://localhost:5000/uploads/19_20_ASN.jpg'],
    price: 250000,
    description: 'Áo CLB Arsenal mùa giải 19-20 chất liệu cotton cao cấp.',
    category: 'ASN',
    stock: { S: 0, M: 10, L: 15, XL: 10 },
  },
  { 
    _id: 8,
    name: 'Áo CLB Arsenal mùa giải 13-14',
    images: ['http://localhost:5000/uploads/13_14_ASN.jpg'],
    price: 200000,
    description: 'Áo CLB Arsenal mùa giải 19-20 chất liệu cotton cao cấp.',
    category: 'ASN',
    stock: { S: 5, M: 10, L: 15, XL: 10 },
  },
  { 
    _id: 9,
    name: 'Áo CLB Arsenal mùa giải 25-26',
    images: ['http://localhost:5000/uploads/25_26_ASN.jpg'],
    price: 210000,
    description: 'Áo CLB Arsenal mùa giải 25-26 chất liệu cotton cao cấp.',
    category: 'ASN',
    stock: { S: 10, M: 10, L: 15, XL: 10 },
  },
  { 
    _id: 10,
    name: 'Áo CLB Arsenal mùa giải 07-08',
    images: ['http://localhost:5000/uploads/07_08_ASN.png'],
    price: 220000,
    description: 'Áo CLB Arsenal mùa giải 07-08 chất liệu cotton cao cấp.',
    category: 'ASN',
    stock: { S: 10, M: 15, L: 20, XL: 10 },
  },
  { 
    _id: 11,
    name: 'Áo CLB Arsenal mùa giải 11-12',
    images: ['http://localhost:5000/uploads/11_12_ASN.jpg'],
    price: 230000,
    description: 'Áo CLB Arsenal mùa giải 11-12 chất liệu cotton cao cấp.',
    category: 'ASN',
    stock: { S: 10, M: 15, L: 20, XL: 10 },
  },
  { 
    _id: 12,
    name: 'Áo CLB Chelse mùa giải 14-15',
    images: ['http://localhost:5000/uploads/14_15_CHE.jpg'],
    price: 230000,
    description: 'Áo CLB Chelse mùa giải 14-15 chất liệu cotton cao cấp.',
    category: 'CHE',
    stock: { S: 10, M: 15, L: 20, XL: 10 },
  },
  { 
    _id: 13,
    name: 'Áo CLB Chelse mùa giải 24-25',
    images: ['http://localhost:5000/uploads/24_25_CHE.jpg'],
    price: 250000,
    description: 'Áo CLB Chelse mùa giải 24-25 chất liệu cotton cao cấp.',
    category: 'CHE',
    stock: { S: 10, M: 20, L: 20, XL: 10 },
  },
  { 
    _id: 14,
    name: 'Áo CLB Chelse mùa giải 11-12',
    images: ['http://localhost:5000/uploads/11_12_CHE.jpg'],
    price: 200000,
    description: 'Áo CLB Chelse mùa giải 11-12 chất liệu cotton cao cấp.',
    category: 'CHE',
    stock: { S: 10, M: 15, L: 20, XL: 10 },
  },
  { 
    _id: 15,
    name: 'Áo CLB Chelse mùa giải 25-26',
    images: ['http://localhost:5000/uploads/25_26_CHE.jpg'],
    price: 230000,
    description: 'Áo CLB Chelse mùa giải 25-26 chất liệu cotton cao cấp.',
    category: 'CHE',
    stock: { S: 10, M: 15, L: 20, XL: 10 },
  },
  { 
    _id: 16,
    name: 'Áo CLB Chelse mùa giải 25-26 màu Pink',
    images: ['http://localhost:5000/uploads/25_26_CHE_PINK.jpeg'],
    price: 200000,
    description: 'Áo CLB Chelse mùa giải 25-26 chất liệu cotton cao cấp.',
    category: 'CHE',
    stock: { S: 10, M: 15, L: 20, XL: 10 },
  },
  { 
    _id: 17,
    name: 'Áo CLB Manchester City mùa giải 25-26 màu Orange',
    images: ['http://localhost:5000/uploads/25_26_MCI_ORANGE.jpg'],
    price: 230000,
    description: 'Áo CLB Manchester City mùa giải 25-26 chất liệu cotton cao cấp.',
    category: 'MCI',
    stock: { S: 10, M: 15, L: 20, XL: 10 },
  },
  { 
    _id: 18,
    name: 'Áo CLB Manchester City mùa giải 19-20',
    images: ['http://localhost:5000/uploads/19_20_MCI.jpg'],
    price: 210000,
    description: 'Áo CLB Manchester City mùa giải 19-20 chất liệu cotton cao cấp.',
    category: 'MCI',
    stock: { S: 10, M: 15, L: 20, XL: 10 },
  },
  { 
    _id: 19,
    name: 'Áo CLB Manchester City mùa giải 25-26 màu BLACK',
    images: ['http://localhost:5000/uploads/25_26_MCI.png'],
    price: 230000,
    description: 'Áo CLB Manchester City mùa giải 25-26 chất liệu cotton cao cấp.',
    category: 'MCI',
    stock: { S: 10, M: 15, L: 20, XL: 10 },
  },
  { 
    _id: 20,
    name: 'Áo CLB Manchester City mùa giải 12-13',
    images: ['http://localhost:5000/uploads/12_13_MCI.jpg'],
    price: 260000,
    description: 'Áo CLB Manchester City mùa giải 12-13 chất liệu cotton cao cấp.',
    category: 'MCI',
    stock: { S: 10, M: 15, L: 20, XL: 10 },
  },
  { 
    _id: 21,
    name: 'Áo CLB Manchester City mùa giải 13-14',
    images: ['http://localhost:5000/uploads/13_14_MCI.jpg'],
    price: 190000,
    description: 'Áo CLB Manchester City mùa giải 13-14 chất liệu cotton cao cấp.',
    category: 'MCI',
    stock: { S: 10, M: 15, L: 20, XL: 10 },
  },
  { 
    _id: 22,
    name: 'Áo CLB Manchester City mùa giải 24-25',
    images: ['http://localhost:5000/uploads/24_25_MCI.jpg'],
    price: 190000,
    description: 'Áo CLB Manchester City mùa giải 24-25 chất liệu cotton cao cấp.',
    category: 'MCI',
    stock: { S: 10, M: 15, L: 20, XL: 10 },
  },
  { 
    _id: 23,
    name: 'Áo CLB Tottenham Hotspur mùa giải 25-26',
    images: ['http://localhost:5000/uploads/25_26_TOT.jpg'],
    price: 200000,
    description: 'Áo CLB Tottenham Hotspur mùa giải 25-26 chất liệu cotton cao cấp.',
    category: 'TOT',
    stock: { S: 10, M: 15, L: 20, XL: 10 },
  },
  { 
    _id: 24,
    name: 'Áo CLB Tottenham Hotspur mùa giải 24-25',
    images: ['http://localhost:5000/uploads/24_25_TOT.jpg'],
    price: 200000,
    description: 'Áo CLB Tottenham Hotspur mùa giải 24-25 chất liệu cotton cao cấp.',
    category: 'TOT',
    stock: { S: 10, M: 15, L: 20, XL: 10 },
  },
  { 
    _id: 25,
    name: 'Áo CLB Tottenham Hotspur mùa giải 23-24',
    images: ['http://localhost:5000/uploads/23_24_TOT.jpg'],
    price: 210000,
    description: 'Áo CLB Tottenham Hotspur mùa giải 23-24 chất liệu cotton cao cấp.',
    category: 'TOT',
    stock: { S: 10, M: 15, L: 20, XL: 10 },
  },
  { 
    _id: 26,
    name: 'Áo CLB Tottenham Hotspur mùa giải 22-23',
    images: ['http://localhost:5000/uploads/22_23_TOT.jpg'],
    price: 250000,
    description: 'Áo CLB Tottenham Hotspur mùa giải 22-23 chất liệu cotton cao cấp.',
    category: 'TOT',
    stock: { S: 10, M: 15, L: 20, XL: 10 },
  },
  {
    _id: 27,
    name: 'Áo CLB Tottenham Hotspur mùa giải 87-89',
    images: ['http://localhost:5000/uploads/87_89_TOT.jpg'],
    price: 220000,
    description: 'Áo CLB Tottenham Hotspur mùa giải 87-89 chất liệu cotton cao cấp.',
    category: 'TOT',
    stock: { S: 10, M: 15, L: 20, XL: 10 },
  },
];

// Hàm thêm sản phẩm vào cơ sở dữ liệu
const seedProducts = async () => {
  try {
    await Product.deleteMany(); // Xóa tất cả sản phẩm hiện có (nếu cần)
    const createdProducts = await Product.insertMany(products);
    console.log('Sản phẩm đã được thêm:', createdProducts);
    process.exit();
  } catch (error) {
    console.error('Lỗi khi thêm sản phẩm:', error);
    process.exit(1);
  }
};

// Chạy script
const runSeeder = async () => {
  await connectDB();
  await seedProducts();
};

runSeeder();