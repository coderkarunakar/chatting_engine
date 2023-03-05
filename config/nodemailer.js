//importing nodemailer
const nodemailer=require('nodemailer');
//inorder to use ejs file we need to import it 
const ejs=require('ejs'); 
//inorder to  work with path we need to provide a path 
const path=require('path');

//this is the part which sends the email..and defines how the communication takes place...


//defining transporter,this is an object attached to nodemailer,so we will be getting all those actions like here we used createTransport,for this pls look in doc at chrome (nodemailer),some will be there and some wont be there
    let transporter=nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    //here we are not using authentication
    auth:{
        user:'chembetikarunakar@gmail.com',//simply our gmail\
        pass:'cqdupuptipkqqnuz', //(https://myaccount.google.com/security) please paste this link in the browser nd please look in class work about this pass how this was generated..and incase not found look in whatsapp my message..
    }
})

//next step ejs template rendering engine..,here relative path means from where the mail is been send and we will be  using the arrow function
let renderTemplate=(data,relativePath)=>{
    //defining a variable 
    let mailHTML;
    //we are going to use ejs to render the template
    ejs.renderFile(
        //these are the arguments  that render file takes ..
        path.join(__dirname,'../views/mailers',relativePath),
        //name which used to be filled inside the template..
        data,
        //callback
        function(err,template){
            if(err){console.log('error in rendering template',err);return};
             //if no error then
            mailHTML=template;
        }
    ) 
    //finally returning mail html
    return mailHTML;
}

//finally exporting 
module.exports={
    //we will export 2 keys
    transporter:transporter,
    renderTemplate:renderTemplate
}