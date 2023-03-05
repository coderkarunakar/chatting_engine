//this line makes us to use all the libraries associated with the express
const express = require('express');
//getting all the libraries associated with the cookie-parser
const cookieParser = require('cookie-parser');
//here it is calling the express   function and puts new express application in app variable
const app = express();
//here simply creating a port to run
const port = 8000;

//ejs does not supports layouts so with this below library we can make it supportable..(layout means positions (i.e css layouts styling a web site..))
const expressLayouts = require('express-ejs-layouts');
const db=require('./config/mongoose');
// used for session cookie

        //USED FOR SESSION COOKIE..

//getting the expess session library..
const session = require('express-session');
//getting passport(is called) and passport local(is initialized) stratergy we are getting .
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy'); //getting that file from the config folder..
//just getting this below file in an variable..
const passportJWT =require('./config/passport-jwt-stratergy');

//just getting the authentication strategy google..
const passportGoogle=require('./config/passport_google_oauth2_stratergy')

//setting mongostore
const MongoStore=require('connect-mongo')(session); //here we took session since we are going to store the sesssion information..and this mongostore requires an argument that is session
//mongostore is used to store  the session cookie in the db

//getting sass middlewae
const sassMiddleware=require('node-sass-middleware');
//we have installed connnect-flash so we are getting that library using require..
const flash=require('connect-flash');
//here getting the middleware created in the config folder..and inorder to use this we called at the end of this file,after calling the flash..
const customMiddleware =require('./config/middleware');

        //SET UP THE CHAT SERVER TO BE USED WITH SOCKET .IO

//getting the socket.io  library
const chatServer =require('http').Server(app);
//our file
const chatSockets=require('./config/chat_sockets').chatSockets(chatServer);
//we have to put it on another port as compared to 8000,so taking 5000
chatServer.listen(5000);
console.log('chat server is listening on port 5000');







//puttting before the server is getting started because i need those files to be precompiled before the server starts when ever browser ask for this .this precompiled gives back
app.use(sassMiddleware({
//source is the from where do i need to pick the files to convert scss to css..
        src:'./assets/scss1',  //dont forget dot slash
        //destination means where do i need to put my css files
        dest:'./assets/scss1',  //dont forget dot slash
        //debug mode what ever the info u see while the server is running in the terminal do i need to display some errors which are in the file during compilation ,when they are not able to convert that file,here we took true ,but when we are running into produciton mode we need to put it into false.
        debug:'true',
        //do i need every thing to be in a single line,or in multiple lines
        outputStyle:'extended',
        
        //where do server look out  for css files..
        prefix:'/css'  //inside the assests folder css file is there
}))




//this line is just like an middle war it parses the incomming request with urlencoded payloads and is based on body parser..
app.use(express.urlencoded());
//this line allowss to use the all the cookie libraries..
app.use(cookieParser());
//here  we are getting the assests folder,in order to serve the css and js files we are using a static file...
app.use(express.static('./assets'));

//make the uploads path available to the browser
app.use('/uploads',express.static(__dirname+ '/uploads')); //here uploads is available in this path

//this line is getting all the libraries associated with the expressLayouts
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set up the view engine
//below line is used to transfer the webpages using using template files..


app.set('view engine', 'ejs');
//views is just like a library and we are fetching that from the views folder that's why we gave ./ 
app.set('views', './views');


//inorder to encrypt the cookie in the session cookie..
app.use(session({
    //keeping some of  the keys..
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,//(when user is not logged in the identity is not established do we need to store the extra information) the ans is no so we took false..
    resave: false,  //(when the user is present and do we need to rewrite the data present again and again ans is no) it prevents from the rewriting again and again..

    //setting some time for the cookie after certain time that cookie gets expires and wont work example act wifi free wifi expires after 60 min loged in 
    cookie: {
        maxAge: (1000 * 60 * 100)//here this is the milliseconds..after calculating this is 60 lakhs milli seconds..
    },
    store:new MongoStore(
        {
        
            mongooseConnection:db, //this db is came from the above code this is the connection took from the config mongoose..
            autoRemove:'disabled'
    
        },
        //callback function if error means..
        function(err){ console.log(err || 'connnect mongodb setup ok');}
    )

}));



//we need to tell the app to use passport..
app.use(passport.initialize());
app.use(passport.session());

//this function is automatically called as a midddle ware ,if any request is comming this middle war get called and user will be set as a locals..and user should acessible in ur views
app.use(passport.setAuthenticatedUser)

//here we are using flash commands after the session is being used..since this flash uses the session cookies..
app.use(flash());
app.use(customMiddleware.setFlash);

 

// use express router
app.use('/', require('./routes'));


//this below lines are just for running our whole code in the required port.
app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
