const express = require('express');
const router = express.Router();
const passport= require('passport');
//posts api controller
const postsApi = require("../../../controllers/api/v1/post_api");


router.get('/',postsApi.index);
//creating a delete route
//just creating an authentication and authorization check..,here session is false since i donot want session cookies to be genrated,this below line will put an authentication check on passport
router.delete('/:id',passport.authenticate('jwt,{session:false}'),postsApi.destroy);



//with this below line it mean that this file can be exported to router
module.exports= router;
