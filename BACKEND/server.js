const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8070;
app.use(cors());
app.use(bodyParser.json());
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
        

        useNewUrlParser: true,  
        useUnifiedTopology: true
        
});

const connection = mongoose.connection;
const labRouter = require('./routes/lab.js');
app.use("/lab", labRouter);

const usersRouter = require('./routes/users.js');
app.use("/users", usersRouter);

const bookingsRouter = require('./routes/bookings.js');
app.use("/bookings", bookingsRouter);

connection.once("open", () => {
        console.log("Mongodb Connection success!")
});

app.listen(PORT, () => {
        console.log(`Server is up and running on port ${PORT}`)
});