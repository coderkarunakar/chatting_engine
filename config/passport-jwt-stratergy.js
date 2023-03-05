//here getting the installed passport
const passport=require('passport');

//this is doing by looking into the passport jwt stratergy document only no need to worry..
//here stratergy is used since the passport containg stratergy in passport-jwt
const JWTStratergy= require('passport-jwt').Strategy;
//importing extract as well since it is used to store in the header
const ExtractJWT= require('passport-jwt').ExtractJwt;   

//we will be establishing the user identity so importing that 
const User= require('../models/user');

//while defining jwt we need to have some options like encryption (we can do it with the help of some key)
//for this look at documentation of passport.org(jwt stratergy)
let opts={
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    //this is our encryption and decryption string..
    secretOrKey: 'codeial'

}

//this is used to authenticate the jwt..

passport.use(new JWTStratergy(opts,function(jwtPayLoad,done){
//find the user based on the information of the payload
    User.findById(jwtPayLoad._id,function(err,User){
        if(err){console.log("Error from finding user from JWT");return;}
        if(user){
            return done(null,user);
        }else{
            return(null,false); //false means that the user was not found
        }

    })
}));


module.exports= passport;