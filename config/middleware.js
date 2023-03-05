//creating a middlewar for the flash messages..
//note:this middleware has 3 arguments i.e req,res,next()
module.exports.setFlash=function(req,res,next){
    //find the flash from the  response and set it up in the locals of the response(we can acess the response in the template) set the flash  message in the locals

    res.locals.flash ={
        //this is an object,this is basically how we find it out ,here fetches from the flash and this fetched is put on the locals..i.e above line
        'success':req.flash('success'),
        //let's have an error also
        'error':req.flash('error')

    }
//this next is very important because the above code get pases to res or next..
    next();
}