const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const multer = require("multer");
const asyncHandler = require('express-async-handler');

mongoose.connect('mongodb://localhost:27017/auto-wardrob');
const upload = multer({
  dest: path.join(__dirname, 'assets', 'temp');
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

app.get('/', (req, res) => {
  res.render('index');
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

app.post('/upload', upload.single('cloth'), asyncHandler(async (req, res) => {
  const tempPath = req.file.path;
  const targetPath = path.join(__dirname, "assets", "wardrobe");
  if (path.extname(req.file.originalname).toLowerCase() === ".png") {
    fs.rename(tempPath, targetPath, err => {
      if (err) return handleError(err, res);

      res
      .status(200)
      .contentType("text/plain")
      .end("File uploaded!");
    });
  } else {
    fs.unlink(tempPath, err => {
      if (err) return handleError(err, res);

      res
      .status(403)
      .contentType("text/plain")
      .end("Only .png files are allowed!");
    });
  }
}));

app.listen(8080, () => {
  console.log('listening on port 8080');
});
