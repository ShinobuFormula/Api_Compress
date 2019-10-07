const express = require('express');
import{compress} from '../api/compressFiles'

const router = express.Router();

router.get('/?*', (req, res) => {
    compress(req.params[0]);
});



module.exports = router;