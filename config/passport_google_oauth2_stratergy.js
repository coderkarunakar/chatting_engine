// //we have installed some of the libraries in our system in order to get all those we are doing this below basic steps 
// const passport=require('passport');
// const googleStratergy= require('passport-google-oauth').OAuth2Strategy;
// const crypto= require('crypto');
// const User=require('../models/user');


// //here asking google to establish the identity of an email id which has been selected by the user that appears in profile and this profile has a list of emails out of which the first email value is checking  if that user exists in  the database,if it does not exist in the database i will create sign up,sign- in using google

// //we need to tell passport to use google stategy..also
// passport.use(new googleStratergy({
//     //passing some of the options ,and this client id,clientsecret ,callback url,was took from the google cloud 
//         clientID:"163721223040-81003jumglvriu2i6a9lnc0lkodrbj70.apps.googleusercontent.com",
//         clientSecret:"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",
//         callbackURL:"http://localhost:8000/users/auth/google/callback",
//     },
//     //put all this in the callback function.,google also generates some accesstoken..,previous we used jwt as our acesstoken,refresh token is to get an new acess token ..without asking user to login again..,and this profile  might contain users information,and we need to match the user info with the info in the database
//     function (accessToken,refreshToken,profile,done){
//         //user can have a multiple emails  so google can give it all by the below code..,find a user
//         User.findOne({email:profile.emails[0].value}).exec(function(err,user){
//             //if any error just display that error
//             if(err){console.log('error in google stategy-passport',err);return}
//             //printing the profile
//             console.log(profile);
//             //if we find an user then we call it up without an error and pass user to it,if user is not found then we pass false to done
//             if(user){
//                 //if user is found set this user as req.user
//                 return done(null,user);
//             }else{
//                 //if not found, create the user and set it as req.user
//                 User.create({
//                     //since profile has many fields 1st field is display name
//                     name:profile.displayname,
//                     emails:profile.emails[0].value,//since saving the first email
//                     password:crypto.randomBytes(20).toString('hex'),//here 20 means length and converting to hexa decimal for understanding the machine 

//                     //if any error or user is found
//                 },function(err,user){
//                     if(err){console.log('error in creating user google stategy-passport',err);return}
//                     //if no error then null means nothing simply call the user
//                     return done(null,user)

//             })

//             }

//         })
//     }
// ))

// module.exports=passport;




const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: "163721223040-81003jumglvriu2i6a9lnc0lkodrbj70.apps.googleusercontent.com", 
        clientSecret: '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', // e.g. _ASDFA%KFJWIASDFASD#FAD-
        callbackURL: "http://localhost:8000/users/auth/google/callback",
    },

    function(accessToken, refreshToken, profile, done){
        // find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if (err){console.log('error in google strategy-passport', err); return;}
            console.log(accessToken, refreshToken);
            console.log(profile);

            if (user){
                // if found, set this user as req.user
                return done(null, user);
            }else{
                // if not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if (err){console.log('error in creating user google strategy-passport', err); return;}

                    return done(null, user);
                });
            }

        }); 
    }


));


module.exports = passport;
