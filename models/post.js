const mongoose=require('mongoose');



//here creating a schema for the posts
const postSchema=new mongoose.Schema({
    //fields are as follows
    content:{
        type:String,
        required:true  //this means this field is mandatory
    },
    user:{
        //this type is a reference,here postschema is going to link to the user and we need to refers  to the userschema ,if u want u check it in the documentation of mongodb,just like a string there is an object id type
        type: mongoose.Schema.Types.ObjectId,
        //this ref means refering to schema..what we have created in mongoose.js file
        ref: 'User'
    },
//include the array  of id's of all comments in the postSchema itself
    comments:[
        {
        //this type is a reference,here postschema is going to link to the user and we need to refers  to the userschema ,if u want u check it in the documentation of mongodb,just like a string there is an object id type
        type:mongoose.Schema.Types.ObjectId,
        //this ref means refering to schema..what we have created in mongoose.js file
        ref:'Comment',
        }

    ],
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Like'
            
        }
    ]
},{

        timestamps:true //this creates a created at and updated at time in the database..

})

//it is going to be a model in the database,we need to tell first..
const Post=mongoose.model('Posts',postSchema);
//just exporting
module.exports=Post;  //then where ever we use it we just import this file.. that's it with this..