// import express and .env
const express = require("express");
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

// import routers
const toDoRouter =  require('./routers/toDoRouter');
const categoryRouter = require('./routers/categoryRouter');

// connect the routers to their paths
app.use(express.json()); // allow json parsing
app.use(cors({
    origin: "http://localhost:3000"
}));

// Linking the routers 
app.use('/api/toDo', toDoRouter);
app.use('/api/toDo/category', categoryRouter);


app.get('/', (req, res) => {
    res.json("Welcome to the to-do app!");
});

// connect to the db and listen on the port specified
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to the MongoDB database");
        const PORT = process.env.PORT;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });


