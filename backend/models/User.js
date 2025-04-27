import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  phone: { type: String },           // thêm
  gender: { type: String },          // thêm
  birthday: { type: Date },
});

export default mongoose.model('User', userSchema);