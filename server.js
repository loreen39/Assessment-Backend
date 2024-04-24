const express = require('express');
const app = express();
const dbConnect=require('./config/dbcon');

require('dotenv').config();
// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

const productRouter = require('./Routes/productRouter');
app.use("/api",productRouter);

dbConnect()
.then(() => {
    // The database connection is successful, you can start your app logic here
    // start the server
    app.listen(process.env.PORT, () => {
        console.log('App is listening on port ' + process.env.PORT);
    });
})
.catch((error) => {
    // Handle error
    console.error('Error connecting to the database:', error.message);
});