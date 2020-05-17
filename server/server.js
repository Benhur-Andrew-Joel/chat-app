const path=require('path');
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');

const publicPath=path.join(__dirname,'../public');
const port=process.env.PORT || 3000;
var app=express();
var server=http.createServer(app);
var io =socketIO(server);
io.on('connection',(socket)=>{
    console.log('User connected');
    socket.emit('newMessage',{
        from:'Admin',
        text:'Welcome to the chat',
        createdAt: new Date().getTime()
    });
    socket.broadcast.emit('newMessage',{
        from:'Admin',
        text:'New User has joined',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage',(message,callback)=>{
        // console.log(`message: ${message}`);
        io.emit('newMessage',{
            from:message.from,
            text:message.text,
            createdAt: new Date().getTime()
        });
        callback('This is from server');
    });




    socket.on('disconnect',()=>{
        console.log('User disconnected')
    });
});
 app.use(express.static(publicPath)) ;
 server.listen(port, ()=>{
     console.log(`The port is running at ${port}`);
  });
