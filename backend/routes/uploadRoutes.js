// backend/routes/uploadRoutes.js
import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Cấu hình multer
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Chỉ nhận file ảnh jpg/jpeg/png');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// Route upload file đơn
router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`); // trả về đường dẫn ảnh
});

export default router;
