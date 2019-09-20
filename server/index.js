const express = require('express');
var bodyParser = require('body-parser')
require('dotenv').config();
var cors = require('./cors');

const House = require('./../database/House.js');
const Photo = require('./../database/Photo.js');
const client = require('./../database/cassandra/connection.js');

const app = express();

// Middlewares
app.use(cors);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
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

app.post('/houses/', (req, res, next) => {
  House.create(req.body, (err, house) => {
    if (err) {
      console.log('error creating this house', err);
      res.status(500).json({ success: false, message: 'Could not create this house' });
    } else {
      res.status(201).json({ success: true, message: 'Item Created', id: house.id });
    }
  });
});

app.put('/houses/:id', (req, res, next) => {
  var houseId = req.params.id;

  House.update({ house_id: houseId }, req.body, (err) => {
    if (err) {
      console.log('error updating this house', err);
      res.status(500).json({ success: false, message: 'Could not update this house' });
    } else {
      res.status(200).json({ success: true, message: 'Item Updated' });
    }
  });
});

app.delete('/houses/:id', (req, res, next) => {
  var houseId = req.params.id;

  House.deleteOne({ house_id: houseId }, function (err) {
    if (err) {
      console.log('error deleting this house', err);
      res.status(500).json({ success: false, message: 'Could not delete this house' });
    } else {
      res.status(200).json({ success: true, message: 'Item Deleted' });
    }
  });
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

app.post('/photos/houses/', (req, res, next) => {
  Photo.create(req.body, (err, photo) => {
    if (err) {
      console.log('error creating photo object', err);
      res.status(500).json({ success: false, message: 'Could not create photo object' });
    } else {
      res.status(201).json({ success: true, message: 'Photo Created', id: photo.id });
    }
  });
});

app.put('/photos/houses/:id', (req, res, next) => {
  var photoId = req.params.id;

  Photo.update({ photo_id: photoId }, req.body, (err) => {
    if (err) {
      console.log('error updating this photo', err);
      res.status(500).json({ success: false, message: 'Could not update this photo' });
    } else {
      res.status(200).json({ success: true, message: 'Photo Updated' });
    }
  });
});

app.delete('/photos/houses/:id', (req, res, next) => {
  var photoId = req.params.id;

  Photo.deleteOne({ photo_id: photoId }, function (err) {
    if (err) {
      console.log('error deleting this house', err);
      res.status(500).json({ success: false, message: 'Could not delete this photo' });
    } else {
      res.status(200).json({ success: true, message: 'Photo Deleted' });
    }
  });
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

// Cassandra API Endpoints
app.get('/houses/cassandra/:id', (req, res, next) => {
  var houseId = req.params.id;
  const query = 'SELECT * FROM houses WHERE house_id = ?';

  client.execute(query, [houseId], { prepare: true })
    .then(result => res.status(200).json(result.rows))
    .catch(err => res.status(400).json(err));
});

app.post('/houses/cassandra', (req, res, next) => {
  const query = 'INSERT INTO houses(house_id,photos,title,"location",is_entire_place,super_host_name,super_host_photo,rating,"desc",space_desc,guest_desc,other_desc,amenities,private_room) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

  client.execute(query, [req.body.house_id, req.body.photos, req.body.title, req.body.location, req.body.is_entire_place, req.body.super_host_name, req.body.super_host_photo, req.body.rating, req.body.desc, req.body.space_desc, req.body.guest_desc, req.body.other_desc, req.body.amenities, req.body.private_room], { prepare: true })
    .then(result => res.status(201).json({ success: true, message: 'Item Created', id: result.id }))
    .catch(err => res.status(400).json(err));
});

const port = process.env.PORT || 3010;

app.listen(port, () => {
  console.log(`Housemania Server is running at port ${port}`);
});
