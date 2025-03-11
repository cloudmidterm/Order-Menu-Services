const express = require('express');
const mongoose = require('mongoose');
const dbconnect = require('./dbconnect.js'); // Your MongoDB connection file
const Order = require('./ordersModel'); // Import Order model
const Food = require('./menuModel'); // Import Food model

const app = express();
app.use(express.json()); // Middleware to parse JSON request body

// API to create an order
app.post('/placeOrder', async (req, res) => {
    try {
        const { customerName, foods } = req.body; // Extract customerName and foodId array from request body

        if (!customerName) {
            return res.status(400).json({ message: 'Customer name is required.' });
        }

        if (!foods || !Array.isArray(foods) || foods.length === 0) {
            return res.status(400).json({ message: 'Foods array is required and cannot be empty.' });
        }

        // Fetch food details using foodId
        const foodItems = await Food.find({ foodId: { $in: foods } });

        if (foodItems.length === 0) {
            return res.status(404).json({ message: 'No valid food items found.' });
        }

        // Calculate total price
        const totalPrice = foodItems.reduce((sum, food) => sum + food.price, 0);

        // Extract food names
        const foodNames = foodItems.map(food => food.name);

        // Create the order with default status as "pending"
        const newOrder = new Order({
            customername: customerName,
            foods, // Store foodId numbers
            price: totalPrice,
            status: 'pending' // Default status
        });

        // Save order in the database
        const savedOrder = await newOrder.save();

        res.status(201).json({
            message: 'Order placed successfully!',
            order: {
                ...savedOrder.toObject(),
                price: `$${totalPrice.toFixed(2)}`, // Add $ to price
                foodNames // Include food names in response
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Error placing order', error });
    }
});

// Start the server
app.listen(5006, () => console.log('Order API Server running on port 5006'));
