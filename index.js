const express = require('express');
require("dotenv").config();
const database = require("./config/database");
const mongoose = require('mongoose')

const app = express();


//connect database
database.connect();

const Task = require('./models/task.model');

app.get("/tasks", async (req , res) => {
    const tasks = await Task.find({
        deleted: false
    });
    res.json(tasks);
});
app.get("/tasks/detail/:id", async (req , res) => {
    try {
        const id = req.params.id;
        const task = await Task.findOne({
            _id: id,
            deleted: false
        });
        res.json(task);
    } catch (error) {
        res.json("Không tìm thấy")
    }
});

// 
const port = process.env.PORT;
app.listen(port, ()=> {
    console.log(`App is listening on port ${port}`);
})