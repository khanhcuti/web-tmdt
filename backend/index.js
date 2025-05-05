import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

const app = express();
const __dirname = path.resolve();
// Middleware
app.use(cors({
<<<<<<< HEAD
    origin: 'http://localhost:5173',
=======
    origin: ['http://localhost:5173', 'http://localhost:3000'],
>>>>>>> 4d166ce (test)
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
app.use(express.json());

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Import routes
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
<<<<<<< HEAD
=======
import cartRoutes from './routes/cartRoutes.js';
>>>>>>> 4d166ce (test)
// Sử dụng routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
<<<<<<< HEAD

=======
app.use('/api/cart', cartRoutes);
>>>>>>> 4d166ce (test)
// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});