//this is the server side when ever  a connection request is received it automatically will send  back and acknowledgement(identify ) to the server..




// chat socket.js is the observer the server which is going to be receive the incomming connections from  all the users which are listeners (subscribers) 
module.exports.chatSockets = function(socketServer){
//receiving the request for connection,what evert the communcication and the interaction via socket takes place here using chat server will be done over here,and io will be handling the connections
let io=require('socket.io')(socketServer);
//note :all htis defined in the documentation..
io.sockets.on('connection',function(socket){
    console.log('new connection received ',socket.id);
    //whenever a client disconnects an automatically disconnect will happens..
    socket.on('disconnect',function(){
        console.log('socket is connected!');    
    });
    //.on will detect the emited event that was sent by the client..in assests chatengine.js

    socket.on('join_room',function(data){
        console.log('joining request receive',data);
        //when the user req  is received i just want one socket to be joined to that particular room
        //here this chatroom was took from the assests chat_engine,WITH     THIS    CHATroom if this name exist then data enters if not exist then it will create  that data inorder to enter..
        socket.join(data.chatroom);
        //if i join in that chatroom then all the users inside that chatroom need to be notified that some user is joined 
        //if u want to emit in a specific chat room we use io
        io.in(data.chatroom).emit('user_joined',data);

    });


        //DETECTING THE SENT MESSAGE
    //detect the send message and broadcast to every one in the room ,this goes to the server and including this every one will be receiving this message..
    socket.on('send_message', function(data){
    io.in(data.chatroom).emit('receive_message',data );
    });

    
});




}


