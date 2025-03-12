const express = require('express');
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json());

const dbconnect = require('./dbconnect.js'); // Your MongoDB connection file
const Food = require('./menuModel.js'); // The Food model

// API to remove a menu item
app.delete('/removeMenu', async (req, res) => {
  const { foodId } = req.body; // Get foodId from request body

  if (!foodId) {
    return res.status(400).json({ message: 'foodId is required.' });
  }

  try {
    // Find and delete the item based on the foodId field
    const deletedItem = await Food.findOneAndDelete({ foodId });

    if (!deletedItem) {
      return res.status(404).json({ message: 'Menu item not found.' });
    }

    res.status(200).json({
      message: 'Menu item removed successfully.',
      removed_item: deletedItem,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove menu item.', error });
  }
});

// Start the server
app.listen(5005, () => console.log('EXPRESS Server Started at Port No: 5005'));
