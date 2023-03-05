const queue=require('../config/kue');
const commentsMailer =require('../mailers/comments_mailer');

//note:every worker has a process function (this function tells the worker that whenever a new task is added into queue u need to run the code inside this process function),here the first argument is type of queue(u can name it anything),here this function consist of job(i.e basically what it needs to do 1.the function need to be executed inside of this that is the mailer which is going to be called and 2.data(i.e the comment we are filling in the email))
queue.process('emails',function(job,done){{
    console.log('emails worker is processing a job',job.data); //here job.data holds the data that is sent.
    commentsMailer.newComment(job.data);


    done();
}})

//note:this worker needs to be called from the controller