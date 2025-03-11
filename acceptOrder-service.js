const express = require('express');
const mongoose = require('mongoose');
const dbconnect = require('./dbconnect.js'); // Your MongoDB connection file
const Order = require('./ordersModel'); // Import Order model

const app = express();
app.use(express.json()); // Middleware to parse JSON request body

// API to accept an order based on orderId
app.put('/acceptOrder/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params; // Get orderId from the URL parameter

        // Find the order by orderId (not _id)
        const order = await Order.findOne({ orderId: orderId });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if the order is already accepted
        if (order.status === 'accepted') {
            return res.status(400).json({ message: 'Order is already accepted' });
        }

        // Update the status to 'accepted'
        order.status = 'accepted';

        // Save the updated order
        const updatedOrder = await order.save();

        res.status(200).json({
            message: 'Order accepted successfully!',
            order: updatedOrder
        });
    } catch (error) {
        res.status(500).json({ message: 'Error accepting order', error });
    }
});

// Start the server
app.listen(5007, () => console.log('Order API Server running on port 5007'));
