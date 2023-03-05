const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const commentEmailWorker = require('../workers/comment_email_worker');
const queue= require('../config/kue');
const Like = require('../models/like');

// //here action is create since we are creating ..

// //this is the part where a new mail is delivered  when ever a new comment is made 
module.exports.create = async function(req, res){

    try{
        let post = await Post.findById(req.body.post);

        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
//this was given by mongodb,here comment is pushed to mongodb

            post.comments.push(comment);
            post.save();
// Similar for comments to fetch the user's id!,and fetching user every time..            
            comment = await comment.populate('user', 'name email').execPopulate();
//here just calling newcomment and passing comment    

            //commentsMailer.newComment(comment);//this line needs to go inside the  kue.. (call of this function),inside a queue am going to create a new job if no job then new queue is created if already a queue exist then push in the job,it automatically takes care of that..
            let job =queue.create('emails',comment).save(function(err){
                if(err){console.log('error in sending to the queue',err);return;}
                console.log('job enqueued',job.id);
            })



            // //here creating an email queue and passing to comments and here we used a save since it get saved in the database,and a callback function that calls the error,below we gave name as job because every task we put into queue is a job..
            // let job=queueMicrotask.create('emails',comment).save(function(err){
            //     if(err){console.log('error in creating a queue');}
            //     console.log(job.id)//the above created job id will be printed here..    
            // });

            if (req.xhr){
                
    
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }


            req.flash('success', 'Comment published!');

            res.redirect('/');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
    
}


module.exports.destroy = async function(req, res){

    try{
        let comment = await Comment.findById(req.params.id);

        if (comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();

            let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

            // CHANGE :: destroy the associated likes for this comment
            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});
            // send the comment id which was deleted back to the views
            
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }


            req.flash('success', 'Comment deleted!');

            return res.redirect('back');
        }else{
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
    
}