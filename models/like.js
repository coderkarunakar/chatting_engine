// const { MongoTailableCursorError } = require('mongodb');
// const mongoose=require('mongoose');
// const LikeSchema=new mongoose.Schema({
//     //the like belongs to user
//     user:{
//         type:mongoose.Schema.ObjectId
//         //i need to define 2 things the 1.type on which the like has been placed and 2.and the object id on which the like has been placed,type could  be post or comment,object id could be the id of the post,or the id of the comment
//     },
//     // first we will call likeable the obeject on which the like has been placed,this defines the object id of the liked object
//     likeable:{
//         type: mongoose.Schema.ObjectId,
//         required:true,
//         //next we need to tell  that it is an dynamic reference,refpath means means we are going to place a path to some  other field which is there and that field is going to define on which type of the object the like has been placed
//         refPath:'onModel'
//     },
//     //this onmodel is going to be a property on likes it self ,and here we will say that the type of the on model is string
//     //this filed is used for defining the type of the liked object  since this is a dynamic reference
//     onModel:{
//         type:String,
//         required:true,
//         enum:['post','Comment'],//this tells that a likeable can be a post or a comment due to refpath model,this enum tells that the likes can be only for the post and comments and nothing other than that..,if i remove enum the like can be for any value but just to be sure that only these two models contains like and no other than this 
//     },

// },{
//     timestamps:true
// });

// const Like=mongoose.model('Like',LikeSchema);
// module.exports=Like;
// //when ever am looking likes of  single post and comments i should be having array of those likes inside that post or comments.,to make it easy to reference ,we are creating this in the post and comment file..,just keeping likes code in comments+post and here we have likes for both post+comments




const mongoose = require('mongoose');


const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId
    },
    // this defines the object id of the liked object
    likeable: {
        type: mongoose.Schema.ObjectId,
        require: true,
        refPath: 'onModel'
    },
    // this field is used for defining the type of the liked object since this is a dynamic reference
    onModel: {
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    }
}, {
    timestamps: true
});


const Like = mongoose.model('Like', likeSchema);
module.exports = Like;







