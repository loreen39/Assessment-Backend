const express = require('express');
const app = express();
const dbConnect=require('./config/dbcon');
const logger = require('./middlewares/logger');
const cors = require('cors');
const { addUser } = require('./Controllers/addDefaultUser');

require('dotenv').config();
app.use(cors({ origin: 'http://localhost:3000' }));
// Middleware to parse JSON bodies
app.use(express.json());

//Middleware to display the requests in console
app.use(logger); 

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));


const productRouter = require('./Routes/productRouter');
app.use("/api/product", productRouter);

const accountRouter = require('./Routes/accountRouter');
app.use("/api/logger", accountRouter);

dbConnect()
.then(() => {
    // The database connection is successful, you can start your app logic here
    // start the server
    app.listen(process.env.PORT, () => {
        console.log('App is listening on port ' + process.env.PORT);
    });

    addUser();
})
.catch((error) => {
    // Handle error
    console.error('Error connecting to the database:', error.message);
});