//this below line fetches the user file in the models folder..and makes it interlink each other..

const User = require('../models/user');
const fs=require('fs');
const path=require('path');

//if sign in was done succesfully then it returns to the profile page
//let's keep it same as before..no need of async and await.. in this file..
module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    });

}



module.exports.update = async function(req, res){
//     if(req.user.id == req.params.id){
//         User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
//             return res.redirect('back');
//         });
//     }else{
//         return res.status(401).send('Unauthorized');
//     }
// }

if(req.user.id == req.params.id){
    try{
        //find the user,once the user is found i need to update the user
        let user =await User.findById(req.params.id);
        //inorder to acess the  form in user_profile we can't acess by the req.param since it is an multipart data this can be accessed with the help of avatar path defined in models ,user.js
        User.uploadedAvatar(req,res,function(err){
            if(err){console.log('******Multer Error:',err)}
            user.name=req.body.name;
            user.email=req.body.email
        if(req.file){
            //if the user has an avatar already present in the file then remove it and upload new one, just because of this below line of code only
            if(user.avatar){
                //if the user has an avatar then delete that avatar,for that we need filesystem fs + path module also
                fs.unlinkSync(path.join(__dirname,'..',user.avatar)); //here 2 dots because we are inside controllers so we need to be parallel to controllers,and this user.avatar stores the uploads/users/avatars file
            }

            //this is saving the path of the uploaded file into the avatar field in the user
            user.avatar =User.avatarPath + '/' +req.file.filename;
        }
        user.save();
        return res.redirect('back');
    });



    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }

}else{
    req.flash('error','Unauthorized!');
    return res.status(401).send('Unauthorized');
}
}







//in the above lines we took 2 times else condition since for the first if condition before it executes only this else is  working so without fetching data only we are going to the same back page so inorder to reduce it we are using 2 else conditions of same content denidi daniki if,else pedtunam ikada


// render the sign up page
module.exports.signUp = function(req, res){
    
    //with this below code if the user is already signed in then they redirect to profile page automatically..like when they manually type signup in url link
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }




    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
       //with this below code if the user is already signed in then they redirect to profile page automatically..like when they manually type signin in url link
       if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }



    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

//NOTE:with the help of this only we are able to go to sign in page after succesful filling the sing up page..
// get the sign up data
module.exports.create = function(req, res){
        // this below code checks the entered password is same or not if not same  then it comes back to same page if password is not corect...

    //req.body.object allows to (access the data) in the form of json or string  from the client side..when ever we want to access the data we will be accesing like this..which is given in ejs file form page..
    if (req.body.password != req.body.confirm_password){

           //if it is not correct then it returns to back same page
        return res.redirect('back');
    }
        //if passwords(both i.e password+confirm password ) both are same then we will be checking the email since email has to be unique every time (i.e when we try to login next time..)

    //this findOne is for finding the one document matching,email..

    //because of this findOne only we are able to check that our email is previously used or not ..if used wont accecpt(returns to same page)

    //here this User is taken from the first line which is importin the schema of email,password etch and stored in the User variable..

    User.findOne({email: req.body.email}, function(err, user){
        //user,err is just a 2 arguments ..
        if(err){console.log('error in finding user in signing up'); return}

//user function

//if the user is not found then create a user..by using the below lines  .create function..
        if (!user){

            //here req.body will consist of the name ,email,password of the form created in the ejs file..user-sign_in...and links from the schema is also there for this body parameter..


            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}
                   //after succesful sign up then it returns to the users(prefix route name defined in the index.js routes folder)and go to sign-in page(defined in the users.js file prefix)

                return res.redirect('/users/sign-in');
            })

            //if the user with that email is already present then again it returns to the same page...



        }else{
            return res.redirect('back');
        }

    });
}

//sign in and create a session for the user 

//when the passport js uses local authentication then it comes to here this code and redirects back (i.e home page)

// // sign in and create a session for the user
// module.exports.createSession = function(req, res){
//     //here instead of success we can put anything it is ourwish..this message get pop up when the user is successfully  signed in..
//     req.flash('success','Logged in successfully ');
// //inorder to put this req.flash message in the below response  we have created a middleware in the config folder (middleware.js file)

//     return res.redirect('/');
// }

// module.exports.destroySession =function(req,res){
//     req.logout();  //passsport gives this to request
//     req.flash('success','you have logged out man!');
    
    
//     return res.redirect('/');
// }

// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have logged out!');


    return res.redirect('/');
}



