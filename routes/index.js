const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('router loaded');


router.get('/', homeController.home);
// this below line is for getting the all user.js related file routers we are using all those here,here users is the prefix for going to the required file 
//it takes to that page when we type this in the localhost url ..

// for any further routes, access from here
// router.use('/routerName', require('./routerfile));
//router name u want to use and where do u want to get it from like in which file
router.use('/users', require('./users'));
router.use('/posts',require('./post'));
router.use('/comments',require('./comments'));
//likes file route path for the index is defined..
router.use('/likes',require('./likes'));

//just telling routes that api folder is there here 
router.use('/api',require('./api'));

module.exports = router;