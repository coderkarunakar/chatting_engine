// const { populate } = require('../models/post');
const  Post=require('../models/post');
const User=require('../models/user');
  
//note:when ever this post is getting called it will store all this posts in the post down we took na and this gets send to the views folder home .ejs file 

//this async declares that this function contains some async statements inside it .
module.exports.home = async function(req, res){

try{
        //display comments and related user using nested population
        //this line tells that this should be awaited..
        // we awaited this post to be completed
            let posts= await Post.find({})
            .sort('-createdAt')//with this our posts get sorted order like top to bottom in an order i.e1,2,3,4...nearest is the first one

            .populate('user')
            .populate({    //populate is  the syntax u can refer in the documentation
                path:'comments',
                populate:{
                    path:'user'
                }
            }).populate('likes');
            
            //this below await line tells that this should be awaited
            //we awaited this user search to be completed..and we writtened something to the browser
        let users=  await User.find({});
            return res.render('home',{
                title:"Codeial | Home",
                posts:posts,
                all_users:users
        
            });
        // if any of the above lines has the error this this error catch works and throws an error
        

        }catch(err){
                console.log('Error',err);
                return ;
        }
}




//module.exports.actionName = function(req, res){}