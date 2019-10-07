const express = require('express');
const compress = require('../api/compressFiles').compress;

const router = express.Router();

router.get('/?*', (req, res) => {
    compress(req.params[0]);
});



module.exports = router;