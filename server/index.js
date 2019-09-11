const express = require('express');
require('dotenv').config();
var cors = require('./cors');

const House = require('./../database/House.js');
const Photo = require('./../database/Photo.js');

const app = express();

// Middlewares
app.use(cors);
app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));
// serve static image files in public if necessary
app.use(express.static(__dirname + '/../public'));


// API Endpoints
app.get('/houses/:id', (req, res, next) => {
  var houseId = req.params.id;

  House.findOne({ house_id: houseId }).populate('photos').exec((err, house) => {
    if (err) {
      console.log('error fetching this house', err);
      res.status(400).json({ success: false, message: 'Could not fetch this House from our Database' });
    } else {
      res.status(200).json(house);
    }
  });
});

app.post('/houses/:id', (req, res, next) => {

});

app.put('/houses/:id', (req, res, next) => {

});

app.delete('/houses/:id', (req, res, next) => {

});

app.get('/photos/houses/:id', (req, res, next) => {
  var houseId = req.params.id;

  Photo.find({ house_id: houseId }, (err, photos) => {
    if (err) {
      console.log('error fetching this house photos', err);
      res.status(400).json({ success: false, message: 'Could not fetch house photos from our Database' });
    } else {
      res.status(200).json(photos);
    }
  });
});

app.post('/photos/houses/:id', (req, res, next) => {

});

app.put('/photos/houses/:id', (req, res, next) => {

});

app.delete('/photos/houses/:id', (req, res, next) => {

});

app.get('/houses/search/:qry', (req, res, next) => {
  var qry = req.params.qry;

  House.find({ $or: [ { title: { $regex: qry, $options: 'i' } }, { location: { $regex: qry, $options: 'i' } } ] }, (err, houses) => {
    if (err) {
      console.log('error searching house', err);
      res.status(400).json({ success: false, message: 'Could not search House from our Database' });
    } else {
      res.status(200).json(houses);
    }
  }).limit(10);
});

const port = process.env.PORT || 3010;

app.listen(port, () => {
  console.log(`Housemania Server is running at port ${port}`);
});
