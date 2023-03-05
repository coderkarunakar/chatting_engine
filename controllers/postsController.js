//in order to work with post and comments which is in the models folder first we need to require it then only we can work with it..

const Post = require('../models/post');
const Comment=require('../models/comment');
const Like = require('../models/like');


module.exports.create=async function(req,res){

    try{
        
        //here we are creating a new post,from the data in the form so we took it as create
   let post= await Post.create({
        //here content is took from the home.ejs file at (text-area) and model post schema at (fields)
        
        content:req.body.content,
        
        user: req.user._id  //here we are just creating the user and this can be found by using post.find({user:user_id},funcition(err,post){})
    });
//just checking the request is ajax request..the type is xhr(xmlhttprequest),this will detect if the post is created..

    if (req.xhr){
        //returning a json with a status
        return res.status(200).json({
            //returning a post
            data:{
                post:post,  //this post is comming from the above (let post )
            },
            //when ever ur sending data back by a json including a message
            message:"post created!",

        })

    }

    //if we create a post then we will get a flash message..
        req.flash('success','post published')
        return res.redirect('back');


    }catch(err){
        req.flash('error',err);

        return;
    }

    
}



//let's create an action for deleting a post+comments associated to it

module.exports.destroy=async function(req,res){
    try{
        let post =await Post.findById(req.params.id);

        if (post.user == req.user.id){

            // CHANGE :: delete the associated likes for the post and all its comments' likes too
            await Like.deleteMany({likeable: post, onModel: 'Post'});
            await Like.deleteMany({_id: {$in: post.comments}});






                post.remove();//this line mean that if user and post user is same 
               

                await Comment.deleteMany({post:req.params.id});

                if(req.xhr){
                    return res.status(200).json({
                        data:{
                            post_id:req.params.id
                        },
                        message:"post deleted kaka"
                    })
                }

//adding a flash message if the posts  got deleted
                req.flash('success','posts and associated comments got deleted');
                return res.redirect('back');

            }
            else{
                req.flash('error','you cannot delete this post');
                return res.redirect('back');

            }

    }catch(err){
        req.flash('error',err);
        return res.redirect('back');

    }


    
}
