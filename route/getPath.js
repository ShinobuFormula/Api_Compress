const express = require('express');
const compress = require('../api/compressFiles').compress;

const router = express.Router();


router.post('/?*', (req, res) => {
    var paths = (req.body.toCompress);
    res.status(200).send(compress(paths,req.body.archiveName));
});


module.exports = router;