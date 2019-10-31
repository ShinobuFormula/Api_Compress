const express = require('express');
const bodyParser = require('body-parser');
var path = require("path");


const getPath = require('./route/getPath');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/", getPath);
app.use('/compressed', express.static(path.join(__dirname,'/fichiers')));


app.listen(5000, ()=>{
    console.log("Listening for queries...")
});