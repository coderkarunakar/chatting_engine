// //this class is going to send a request for connection
// //here as soon as the class is initialized i send a connection request and the connection handler detects using the socket and this is the frontend side ..
// class ChatEngine{  
//     //constructor takes 2 things i.e id of the chat box and email id of the user(just to know who is sending message)
//     constructor(chatBoxId,userEmail){
//         this.chatBox = $(`#${chatBoxId}`); //here backticks is used
//         this.userEmail=userEmail,
//         //we need to initiate the connection
//         //here io is the global variable since we included socket.io cdn file in the home .ejs file
//         //here given 5000 as local host since we declared  in the main index.js file..
//         this .socket=io.connect("http//localhost(5000)");

// //this below connection handler need to be called this can be only possibe if we have only useremail

// if(this.userEmail){
//     this.connectionHandler();
// }




//     }
//     //this connection handler will have the too and fro interaction with the server and the user
//     connectionHandler(){
//         //asking to join a room for chatting purpose..
//         let self = this;




//         //here events takes place in that first event is connect
//          this.socket.on('connect',function(){
//             console.log('connection established using sockets..');
// //here name can be anything here we took join room but this name  has to be corresponds to the servers room ..,here when ever am sending a request to join room i can send a request to which room need to join..,which user do i need to chat..,the data which am going to send is my email..

// //when this event is emited this will be received on chatsocket.js on config..
//             self.socket.emit('join_room',{
//                 user_email:self.userEmail,
//                 //the room which i want to join
//                 chatroom:'codeial'
//          });
//          self.socket.on('user_joined',function(data){
//             console.log('a user joined',data);
//          })
//         });
//     }
// }


// //initiating the above given class i.e chatEngine  lets do it in the home.ejs file

class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000');

        if (this.userEmail){
            this.connectionHandler();
        }

    }


    connectionHandler(){
        let self = this;

        this.socket.on('connect', function(){
            console.log('connection established using sockets...!');


            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codeial'
            });

            self.socket.on('user_joined', function(data){
                console.log('a user joined!', data);
            })


        });

        //CLICKING THE SEND MESSAGE BUTTON...
        

        // CHANGE :: send a message on clicking the send message button
        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();

            if (msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                });
            }
        });

        self.socket.on('receive_message', function(data){
            console.log('message received', data.message);


            let newMessage = $('<li>');

            let messageType = 'other-message';

            if (data.user_email == self.userEmail){
                messageType = 'self-message';
            }

            newMessage.append($('<span>', {
                'html': data.message
            }));


            //APPENDING THE MESSAGE..

            newMessage.append($('<sub>', {
                'html': data.user_email
            }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
        });
    }
}