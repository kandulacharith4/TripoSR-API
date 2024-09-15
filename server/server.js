const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();

// Set up multer for image uploads
const upload = multer({ dest: './uploads/' });

// Set up body parser for text input
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a route for the frontend to send input data
app.post('/input', (req, res) => {
  // Check if the input type is image or text
  if (req.body.inputType === 'image') {
    // Handle image upload
    upload(req, res, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: 'Error uploading image' });
      } else {
        // Save the image to the uploads folder
        const imagePath = req.file.path;
        res.send({ message: 'Image uploaded successfully' });
      }
    });
  } else if (req.body.inputType === 'text') {
    // Handle text input
    const textInput = req.body.text;
    res.send({ message: `Received text input: ${textInput}` });
  } else {
    res.status(400).send({ message: 'Invalid input type' });
  }
});

// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// const express = require('express');
// const multer = require('multer');
// const bodyParser = require('body-parser');

// const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// const upload = multer({ dest: './uploads/' });

// app.post('/upload', (req, res) => {
//   if (req.body && req.body.text) {
//     res.json({ text: req.body.text });
//   } else if (req.file) {
//     const file = req.file;
//     const url = `http://localhost:3000/uploads/${file.filename}`;
//     res.json({ url });
//   }
//   else {
//     res.status(400).send({ message: 'Invalid request' });
//   }
// });

// app.get('/uploads/:filename', (req, res) => {
//   const filename = req.params.filename;
//   res.sendFile(`./uploads/${filename}`);
// });

// app.listen(4000, () => {
//   console.log('Server started on port 4000');
// });
// const express = require('express');
// const multer = require('multer');
// const app = express();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// app.post('/image', upload.single('file'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send({ message: 'No file uploaded.' });
//   }

//   res.send(`File uploaded successfully!`);
// });

// app.use('/uploads', express.static('uploads'));

// app.listen(5000, () => {
//   console.log('Server started on port 5000');
// });
