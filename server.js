'use strict';

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

const uploadFile = upload.single('upfile');

app.post('/api/fileanalyse', uploadFile, (req, res) => {
  if (req.file === undefined) {
    return res.status(400).json({error: "not found"});
  }
  
  return res.json({
    filename: req.file.filename,
    size: req.file.size
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Node.js listening ...');
});
