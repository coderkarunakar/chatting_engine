
//getting express and router library..
const express = require('express');
const router = express.Router();
const passport=require('passport')
//with this we can access all the actions exported in the controllers file
const postController=require('../controllers/postsController');  //be careful not to give spaces in the file name also..
//post is used since we are posting the form,and we used method also as post

// here passport is took from the above and checkAuthentication is the function created in the config folder ,passportlocal file
router.post('/create',passport.checkAuthentication, postController.create);

router.get('/destroy/:id',passport.checkAuthentication,postController.destroy) //here checking authentication is done since not every one can delete it only particular user can only delete it so authentication is done




//finally exporting this router
module.exports=router;