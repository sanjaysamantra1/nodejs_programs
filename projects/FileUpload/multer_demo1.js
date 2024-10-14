const express = require('express');
const multer = require('multer');
const path = require('path');

// Initialize the app
const app = express();

// Set up storage engines for different file types
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype.startsWith('image')) {
      cb(null, 'assets/images');
    } else if (file.mimetype === 'application/pdf') {
      cb(null, 'aseets/docs');
    } else {
      cb(new Error('Invalid file type'), false);
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// File filter function to allow only certain types
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image') || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images and PDFs are allowed!'), false);
  }
};

// Limit file size to 2MB
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB limit
});

// Handle single file upload
app.post('/upload-single', upload.single('singleFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded or invalid file type.');
  }
  res.send(`Single file uploaded successfully: ${req.file.filename}`);
});

// Handle multiple files (max 3 images + 1 PDF)
app.post('/upload-multiple', upload.fields([
  { name: 'images', maxCount: 3 },
  { name: 'docs', maxCount: 1 }
]), (req, res) => {
  if (!req.files || (Object.keys(req.files).length === 0)) {
    return res.status(400).send('No files uploaded or invalid file types.');
  }

  const uploadedFiles = [];
  if (req.files['images']) {
    req.files['images'].forEach(file => uploadedFiles.push(file.filename));
  }
  if (req.files['docs']) {
    uploadedFiles.push(req.files['docs'][0].filename);
  }

  res.send(`Files uploaded successfully: ${uploadedFiles.join(', ')}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer-specific errors
    return res.status(500).send(`Multer error: ${err.message}`);
  } else if (err) {
    // General errors
    return res.status(500).send(`Error: ${err.message}`);
  }
  next();
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
