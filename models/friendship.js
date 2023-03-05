const mongoose= require('mongoose');

const friendSchema= new mongoose.Schema({
    //the user who sent this request
    from_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',

    },
    //the user who accepted this request, the naming is just to understand ,otherwise the users wont see a difference
    to_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',

    },
},{
    //with this timestamp we can know when was the friendship request was sent and established..
    timestamps:true
})

const Friendship =mongoose.model('Friendship',friendSchema);
module.exports=Friendship;