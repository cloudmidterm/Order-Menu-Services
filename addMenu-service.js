const express = require('express');
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json());

const dbconnect = require('./dbconnect.js'); // Your MongoDB connection file
const Food = require('./menuModel.js'); // The Food model you just provided

// POST endpoint for adding a menu item
app.post('/addMenu', (req, res) => {
  
  // Destructure data from the request body
  const { name, restaurant, category, price } = req.body;

  const foodItem = new Food({
    name,
    restaurant,
    category,
    price
  });

  // Save the food item to the database
  foodItem.save()
    .then(insertedDocument => {
      res.status(200).send('Menu item added successfully!');
    })
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error while saving the menu item.' });
    });
}); // CLOSE POST METHOD

// Start the server
app.listen(5003, () => console.log('EXPRESS Server Started at Port No: 5003'));
