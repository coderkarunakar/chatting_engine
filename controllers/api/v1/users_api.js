


const User = require('../../../models/user');
const jwt = require('jsonwebtoken');


module.exports.createSession = async function(req, res){
//     //when ever a username and a password is received we need to find that user and generate a json webtoken corresponding to that user

    try{
        let user = await User.findOne({email: req.body.email});
// //if the user is not found

        if (!user || user.password != req.body.password){
            return res.json(422, {
                message: "Invalid username or password"
            });
        }//here we took 422 error code since invalid input by the user

        return res.json(200, {
            message: 'Sign in successful, here is your token, please keep it safe!',
            data:  {
                 //here sign is a function to which i will pass on to the user,and using the same key which we used to decrypt i.e codeial,here 10000 is the no of milliseconds

                token: jwt.sign(user.toJSON(), 'codeial', {expiresIn:  '100000'})
            }
        })
        //if any error is found ..

    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}