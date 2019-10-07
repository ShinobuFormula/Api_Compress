const express = require('express');

const getPath = require('./route/getPath');

const app = express();

const router = express.Router();

app.use("/", getPath);

app.listen(5000, ()=>{
    console.log("Listening for queries...")
});