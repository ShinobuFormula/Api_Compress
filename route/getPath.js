const express = require('express');
const compress = require('../api/compressFiles').compress;

const router = express.Router();

router.post('/?*', (req, res) => {
    var paths = Object.entries(req.body);


    paths.forEach((elem, index) => {
        if(elem[1] === req.body.archiveName){
           paths.splice(index,1)
        }
    });


    res.json(compress(paths,req.body.archiveName));
});


module.exports = router;