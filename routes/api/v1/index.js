const express = require('express');
const router = express.Router();
router.use('/posts',require('./posts'));

router.use('/users',require('./users'));


//with this below line it mean that this file can be exported to router
module.exports= router;
