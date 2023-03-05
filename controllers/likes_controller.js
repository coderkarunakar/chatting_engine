// //we need to import like ,post, comment
// const Like=require('../models/like');
// const Post=require('../models/post');
// const Comment=require('../models/comments');

// //creating a action
// module.exports.toggleLike=async function(req,res){
//     try{
//         //our url will be like this way 
//         let likeable;
//         let deleted=false;  //because when u receive json data back  based on that we can increment or decrement the count of the likes which is displayed on a page,when i click on like button if the deleted is false it becomes +1 ,if deleted is true then it becomes 0  likes this deleted acts like this..
//         //finding likeable
//         if(req.query.type=='Post'){
//             //populate is used to know that if there are any likes on that post 
//             likeable=await Post.findById(req.query.findById).populate('likes');
        
//             //incase it is not post then it is comments since we defined only comments ,posts
//         }else{
//             //with this populate we can know that the comments are having likes or not 
//             likeable= await Comment.findById(req.query.id).populate('likes');
// }
// //next step : i need to check if a like already exists,here we took findOne because one user can like only once so we took only findone
// let existingLike = await Like.findOne({
//     likeable:req.query.id,
//     onModel: req.query.type,
//     //user is used since a user cannot like without authentication
//     user:req.user._id
// })


// //if already a like exist then we delete it
// if(existingLike){
//     //this is how we pull the likes 
// likeable.likes.pull(existingLike._id);
// likeable.save();
// existingLike.remove();
// deleted= true;//so that our user knows that this like has been either deleted or created(false means deleted,created means true..)


// }else{
//     //make a new like
//     let newLike=await Like.create({
//         user:req.user._id,
//         //in the doc it is on but if we run it it wont run(cannot be defined as a field) so we took it as likeable
//         likeable:req.query._id,
//         onModel:req.query.type,

//     });
//     likeable.likes.push(newLike._id);
//     likeable.save();
// }


// //simply return json
// return res.json(200,{
//     message:"Request Successful",
//     data:{
//         deleted:deleted
//     }
// })





//         //if any error we need to send it either json or flash message since this like is going to work with ajax so req so we will send back json data

//     }catch(err){
//         console.log(err);
//         return res.json(500, {
//             message: 'Internal Server Error'
//         });

//     }
// }


const Like = require("../models/like");
const Post =  require("../models/post");
const Comment = require('../models/comment');


module.exports.toggleLike = async function(req, res){
    try{

        // likes/toggle/?id=abcdef&type=Post
        let likeable;
        let deleted = false;


        if (req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }


        // check if a like already exists
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        })

        // if a like already exists then delete it
        if (existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();

            existingLike.remove();
            deleted = true;

        }else{
            // else make a new like

            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });

            likeable.likes.push(newLike._id);
            likeable.save();

        }

        return res.json(200, {
            message: "Request successful!",
            data: {
                deleted: deleted
            }
        })



    }catch(err){
        console.log(err);
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }
}