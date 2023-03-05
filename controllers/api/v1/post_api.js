const Post=require('../../../models/post'); //here .. means to api ,..mean to going down and ..mean to models post
const  Comment=require('../../../models/comment');

module.exports.index=async function(req,res){


let posts= await Post.find({})
        .sort('-createdAt')//with this our posts get sorted order like top to bottom in an order i.e1,2,3,4...nearest is the first one

        .populate('user')
        .populate({    //populate is  the syntax u can refer in the documentation
            path:'comments',
            populate:{
                path:'user'
            }
        });

        return res.json(200,{
            message: "List of posts",
            posts:posts
        })
    }

//this is for deleting the post,comments (associated with post)using the post api with out authentication and authorization..,find the post delete the post and delete the post +associated comments with the post

    module.exports.destroy=async function(req,res){
        try{
            let post =await Post.findById(req.params.id);

            //if user matches below will execute if not else part will work
    
            if (post.user == req.user.id){ //we dont have request right now so it wont function
                    post.remove();//this line mean that if user and post user is same 
                   
    
                    await Comment.deleteMany({post:req.params.id});
    
                    return res.json(200,{
                        message:"posts and associated comments deleted successfully !"
                    });
    
                
                }else{
                    return res.json(401,{
                        //since user is unauthorized to delete this post
                        message:"You cannot delete this post"
                    })
    
                }
            
    
        }catch(err){
            console.log("******",err)
            return res.json(500,{
                message:"internal server Error"
            });
    
        }
    }
    
        
    
    