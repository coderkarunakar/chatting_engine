const mongoose = require('mongoose');
const multer = require('multer');//we have installed multer so we are getting that
const path = require ('path');//this helps working with directories and file paths..
const AVATAR_PATH =path.join('/uploads/users/avatars');//this line string has been converted into path using the above line path defined..

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar:{
        type: String
    },
    //just creating an array of friendship,with this we can have a superfast acess when am trying to find the friendships
    friendships:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Friendship'
        }
    ]

}, {
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {  //request file and a callback function..
        //1st null, 2nd is path where file need to be stored..
      cb(null, path.join(__dirname,'..',AVATAR_PATH));  
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());//here file.fieldname will every file i save this will be stored as avatar-present date since here field name is avatar we defined avove in fields
    }
  });
  //static(oops concept) key are called overall on the whole class,single means only  one file will be uploaded not multiple files ,uploadedAvatar is just an function name
  userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
  userSchema.statics.avatarPath =AVATAR_PATH;  //this line is at the top we required the path and making that is available every where so assigning to this..




const User = mongoose.model('User', userSchema);

module.exports = User;