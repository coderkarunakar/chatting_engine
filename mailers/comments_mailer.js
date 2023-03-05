
// //note:when ever a new comment is made we need to call this mailer,we will be calling in the comments controller at controllers folder
// //all the comments related mails would be put up here..

const nodeMailer = require('../config/nodemailer');

// //this is the another way of exporting a method..(previous we used  module.export filename now this is the new way..)and here we will be using the arrow function..(this arrow function will take argument as newcomment)

// this is another way of exporting a method
exports.newComment = (comment) => {
    //along with the with are sending relative path +data as well ,which is in config folder node mailer file,inorder to render that file we have used ejs in config (nodemailer file) so it will automatically pick it up(i.e ejs render file +path we have defined.. ),here we need to prodive extension .ejs as well since it is unable to find it..`
    let htmlString=nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');


    console.log('inside newComment mailer', comment);
//     //next step i need to  send an email

    nodeMailer.transporter.sendMail({
       from: 'chembetikarunakar@gmail.com',
       to: comment.user.email,
       subject: "New Comment Published!",
       html: htmlString

// //creating a callback incase any error,here info carries the information that request has been sent..using an arrow function..


    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }
//if there is no error 
        // console.log('Message sent', info);
        return;
    });
}