require('dotenv').config();
console.log('Loaded MONGO_URI:', process.env.MONGO_URI); // Log to ensure the URI is loaded

const mongoose = require('mongoose');
const url = process.env.MONGO_URI;

if (!url) {
    console.error("MONGO_URI is not defined in the .env file");
    process.exit(1);
}

mongoose.connect(url)  // No need for `useNewUrlParser` and `useUnifiedTopology`
    .then(() => {
        console.log('NODEJS TO MongoDB Connection ESTABLISHED...');
    })
    .catch(err => {
        console.log('Error in DB connection: ', err);
        process.exit(1);
    });

module.exports = mongoose;
