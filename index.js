const express = require('express');
require("dotenv").config();
const bodyParser = require("body-parser");
const database = require("./config/database");
const mongoose = require('mongoose');
const routesApiVer1 = require("./api/v1/routes/index.route");

const app = express();


//connect database
database.connect();

// parse application/json
app.use(bodyParser.json())

// Router Version 1
routesApiVer1(app);


const port = process.env.PORT;
app.listen(port, ()=> {
    console.log(`App is listening on port ${port}`);
})