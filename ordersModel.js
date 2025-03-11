const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const OrderSchema = new mongoose.Schema(
    {
        orderId: { type: Number, unique: true }, // Auto-incremented order ID
        customername: { type: String, required: true },
        foods: [{ type: Number, required: true }], // Array of foodId numbers
        price: { type: Number, required: true },
        date: { type: Date, default: Date.now },
        status: { type: String, enum: ['pending', 'accepted'], default: 'pending' } // Order status
    }, 
    { timestamps: true }
);

// Ensure orderId starts from 1 and increments by 1
OrderSchema.plugin(AutoIncrement, { inc_field: 'orderId', start_seq: 1 });

module.exports = mongoose.model('Order', OrderSchema);
