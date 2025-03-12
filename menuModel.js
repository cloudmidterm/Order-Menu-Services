const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema(
    {
        foodId: { type: Number, unique: true }, // Auto-incremented food ID
        name: { type: String, required: true }, // Food name
        restaurant: { type: String, required: true }, // Restaurant name
        category: { type: String, required: true }, // Food category (e.g., appetizer, main course, dessert)
        price: { type: Number, required: true }, // Price of the food item
    },
    { timestamps: true }
);

// Auto-incrementing the `foodId` field
FoodSchema.plugin(require('mongoose-sequence')(mongoose), { inc_field: 'foodId' });

module.exports = mongoose.model('Food', FoodSchema);
