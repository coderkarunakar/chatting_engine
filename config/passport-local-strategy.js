    //for requiring the whole passport library..
const passport = require('passport');

//for getting the local passport library..(we will be using the caps(starting letters) here since passport uses like that )
const LocalStrategy = require('passport-local').Strategy; //this is v.imp the spelling of (stategy) in the library write correctly else error might occurs
//getting the file from models folder in order to work with schema and stored in User variable.

const User = require('../models/user');  //models folder user file..since we are going to use email from that schema
                    

                        //authentication using passport..
 
//here passport checks who signed..and serializer set that user into cookie..
//we will be requiring the user(we need to tell passport to use local stratergy )
 
                        // authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email',//this is the syntax and here email is took  from  the schema..from config file that's y we imported above.. 
        //this below line allows us to get the request because of this only we are able to put req in the below function..
        passReqToCallback:true
    },

//the below is the call back after the user is signed in ..

    function(req,email, password, done){//req is success or error this was handled by (done)
        //find a user and establish the identity..,here done is a callback function which is reporting to passport js
        
    //here User is taken from the top imported model folder and stored in User ,and here 1st email is taken from the schema and other 2nd email is the property of a function we created 

        // find a user and establish the identity
        User.findOne({email: email}, function(err, user)  {
            //(err argument)
            if (err){
                req.flash('error',err); //this err is from the above function arguments..

                return done(err);//done takes 2 arguments (i.e error and other now we will only go with error..)
            }
//if the user not found and  password doesnot match then printing the error in the terminal...

            if (!user || user.password != password){// here || means logical or function if any  of these corect it works and if both are corect also it works..
                req.flash('error','Invalid username/password'); //here we took username/password since the hacker should not no that which is right or wrong ,because hacking occurs.


                return done(null, false);//here as we know done takes 2 arguments 1 is error (i.e null)and other is (false ) i.e authentication is not done..
            }
 //if the user is found just passing the user...
            //(user argument)
            return done(null, user);
        });
    }


));
                        //SERIALIZING..


//serializing the user to decide which key is to  be kept in the cookies
//serializing means setting the user id into the cookie..
//if user is found and authenticated here simply which property to sent to the cookie is happening..i.e serializing and cookie is sent to the browser automatically in the response
// and when the next response comes in we need to find which user is sign in and making request(i.e deserializing ..)


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){  //it is just an function
    
//this line automatically stores in encrypted format and here we want to store user. id 
//passport finds who the user is signed  and this serializer sets the cookie for that particular user..
    done(null, user.id);
});//here serializer is an in built function ,and we can call anything in  place of done just simply  here we are using done it is just like a call back function..



                        
                    //DESERIALIZING ..

//deserializing the user from the key in the cookie..
//deserializing means when the serialized cookie is sent back to browser we from the database we are using that id to find the user is called deserializing ...



// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
       //err argument
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);  //this gives a callback to the passport js automatically ...
        }
            //user argument
        return done(null, user);
    });
});
//FINALLY MAKING IT AVAILABLE TO ALL THE FILES.


//sending data of current user to the views

// here if the user is signed in it goes to next page if not signed in it redirects to the sign-in page

//1.check if the user is authenticated..
passport.checkAuthentication  =function(req,res,next){//here we have created a function
        //checking wheather this req is authenticated or not passport uses a method called isauthenticated ,this detects wheather the user is signed in or not.
        if(req.isAuthenticated()){
            // if the user is signed in ,then pass on the request to the next function(controller's action)
            return next();
        }
        //if the user is not signed in 
        return res.redirect('/users/sign-in'); //goes to sign-in page only again 

}

//set the user for the views ,it is just an middle war that checks wheather the  user is signed in or not,(if the user is signed in )set the authentication..

passport.setAuthenticatedUser=function(req,res,next){ // here we have created a fucntion
    if(req.isAuthenticated()){
        res.locals.user=req.user; //here req.user is already handled by passport and when an user is signed (from the session -cookie)in then it contains those information  and we are just sending this to the locals for the views
    }
    next();

}

module.exports = passport;

//ONCE PLEASE READ ALL THE COMMENTS WRITTEN HERE EVERYTHING IS SO EASY ..WE CAN UNDERSTAND AND WE MAKE AS PER THE DOCUMENTATION STEPS THAT'S IT ,IF U WANT DOCUMENTATION GO TO GOOGLE AND SEARCH FOR PASSPORTJS FIRST LINK HAS DOCUMENT AND SEARCH FOR LOCAL PASSPORT IN THE STRATERGY..THERE ALL THIS STEPS WILL BE THERE EVEN IF U DONT UNDERSTAND SEARCH  IN GOOGLE..