const express = require('express');
const router = express.Router();
const passport = require('passport');  //getting the passport library..

const usersController = require('../controllers/users_controller');

router.get('/profile/:id', passport.checkAuthentication, usersController.profile);

//in index.js file a users prefix is created u need to use both that users+this sign-up in this local host url.
//here we took post since data is being updated.. in the database..
router.post('/update/:id', passport.checkAuthentication, usersController.update);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

//  it is post since we are positng data and going to other pages
router.post('/create', usersController.create);

//use passport as a middle ware to authenticate..and router.post not only  takes 2 but also  3 

//here first the request comes to router.post and passport first authenticates it ,if the authentication is done then it returns the user(call back function  ), if it is not done then it redirects to sign in page.if it is done then next the below function is called...(i.e createsession..)
// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(  //this passport.authentication checks wheather user is autenticated or not we can see code in cotroller.js 
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);


router.get('/sign-out',usersController.destroySession);


//here we will be creating 2 routes 


//1.when i click on the button for the google sign-in it takes me to  database and the data is fetched from there
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

//this will be given by  the passport,and the first argument is google the stategy ,2nd argument is scope (it is the information which we are looking to fetch)


//2.when google fetches the data and send back to me (on the route called as callback..)


//2nd route,this is the url at which i receives the data,this will first go to the middleware,if the user is sign in go to the createsession(which redirects me to  home page)

//once am signed in (i.e if the call back has worked perfectly(like it has passed through the given middle ware of authentication ) then it pass to controller to createsession action )this fetches to the controller folder create session  action(i.e users controller)


router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), usersController.createSession);


module.exports = router;