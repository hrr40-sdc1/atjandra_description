require('newrelic');

const express = require('express');
var bodyParser = require('body-parser');
require('dotenv').config();
var cors = require('./cors');

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

// app.get('/houses/search/:qry', (req, res, next) => {
//   var qry = req.params.qry;

//   House.find({ $or: [ { title: { $regex: qry, $options: 'i' } }, { location: { $regex: qry, $options: 'i' } } ] }, (err, houses) => {
//     if (err) {
//       console.log('error searching house', err);
//       res.status(400).json({ success: false, message: 'Could not search House from our Database' });
//     } else {
//       res.status(200).json(houses);
//     }
//   }).limit(10);
// });

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
