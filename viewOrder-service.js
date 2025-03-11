const express = require('express');
const mongoose = require('mongoose');
const dbconnect = require('./dbconnect.js'); // Your MongoDB connection file
const Order = require('./ordersModel'); // Import Order model
const Food = require('./menuModel'); // Import Food model

const app = express();
app.use(express.json()); // Middleware to parse JSON request body

// API to view all orders
app.get('/viewOrder', async (req, res) => {
    try {
        // Retrieve all orders
        const orders = await Order.find();

        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found.' });
        }

        // Fetch food details for each order
        const ordersWithDetails = await Promise.all(
            orders.map(async (order) => {
                const foodItems = await Food.find({ foodId: { $in: order.foods } });

                const foodDetails = foodItems.map(food => ({
                    name: food.name,
                    price: `$${food.price.toFixed(2)}`
                }));

                return {
                    orderId: order.orderId,
                    customerName: order.customername,
                    foods: foodDetails, // Show food names and prices
                    totalPrice: `$${order.price.toFixed(2)}`,
                    status: order.status
                };
            })
        );

        res.status(200).json({
            message: 'Orders retrieved successfully!',
            orders: ordersWithDetails
        });

    } catch (error) {
        res.status(500).json({ message: 'Error retrieving orders', error });
    }
});

// Start the server
app.listen(5008, () => console.log('Order API Server running on port 5008'));
