const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const multer = require('multer');
const asyncHandler = require('express-async-handler');
const fs = require('fs');

var imageCounter = 0;
mongoose.connect('mongodb://localhost:27017/auto-wardrob', { useNewUrlParser: true });
const upload = multer({
  dest: path.join(__dirname, 'assets', 'temp')
});

var app = express();

app.set('view engine', 'hbs');

app.use(serveStatic(path.join(__dirname, 'assets')));
app.use(bodyParser.urlencoded({ extended: false }));
/*
{
type: 'upper'/'lower'/'full',
name: 'tshirt',
color: 'black',
weather: 'winter',
imagePath: './pic/clothing1.png'
}
*/

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to mongodb');

  // var TShirt = new Clothing({ type: 'TShirt', color: 'Black', imagePath: './pic/clothing1.png'});
  // TShirt.save(function (err, cloth) {
  //   if (err) return console.error(err);
  //   console.log(cloth);
  // });
  Clothing.deleteMany({color: 'White'}, function(err) {
    if (err) return console.error(err);
  })
});

var clothingSchema = new mongoose.Schema({
  type: String,
  color: String,
  imagePath: String
});

var Clothing = mongoose.model('Clothing', clothingSchema);

const handleError = (err, res) => {
  console.error(err);
  res
    .status(500)
    .contentType('text/plain')
    .end('Oops! Something went wrong!');
};

app.get('/', (req, res) => {
  if (req.query && req.query.errorUpload == 'true') {
    res.render('index', { errorUpload: true, errorMessage: `${req.query.errorMessage}.`});
  } else if (req.query && req.query.successUpload == 'true') {
    res.render('index', { successUpload: true });
  } else {
    res.render('index');
  }
});

app.get('/generateSF', (req, res) => {
  console.log('SF');
  res.send('gen');
});

app.get('/generateSU', (req, res) => {
  console.log('SU');
  res.send('gen');
});

app.get('/generateWI', (req, res) => {
  console.log('WI');
  res.send('gen');
});

app.get('/generateFL', (req, res) => {
  console.log('FL');
  res.send('gen');
});

app.post('/upload', upload.single('image'), asyncHandler(async (req, res) => {
  if (!req.file) {
    res.redirect('/?errorUpload=true&errorMessage=Please select a file');
  } else {
    const tempPath = req.file.path;
    const fileType = path.extname(req.file.originalname).toLowerCase();
    const targetPath = path.join(__dirname, 'assets', 'wardrobe', `i${imageCounter}${fileType}`);
    if (fileType === '.png' || fileType === '.jpg' || fileType === '.jpeg') {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);
        imageCounter += 1;
        res.redirect('/?successUpload=true');
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);
        res.redirect('/?errorUpload=true&errorMessage=Only image files are allowed');
      });
    }
  }
}));

app.listen(8080, () => {
  console.log('listening on port 8080');
});
