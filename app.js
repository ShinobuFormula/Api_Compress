const express = require('express');

const getPath = require('./route/getPath');

const app = express();

app.use("/", getPath);

app.listen(5000, ()=>{
    console.log("Listening for queries...")
});