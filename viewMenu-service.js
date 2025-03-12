require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const FoodSchema = require('./menuModel'); // Assuming your menuModel.js is in the same directory

const port = 5004;

app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Error connecting to MongoDB:', err));

// Route to fetch all menu items
app.get('/viewMenu', async (req, res) => {
    try {
        const menuItems = await FoodSchema.find(); // Fetch all food items
        res.status(200).json({
            message: 'Menu fetched successfully!',
            menuItems
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log('View Menu Service Server is running on PORT NO:', port);
});
