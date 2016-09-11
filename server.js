/**
 * Created by divesh212 on 16/8/16.
 */

const express = require('express');
const http = require('http');
const socketio= require('socket.io');
const bodyParser = require('body-parser');
const db = require('./dbhandler');


const app=express();
const server=http.Server(app);
const io=socketio(server);
var line_history = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('port',3000);

app.use('/', express.static('./public_html'));

app.post('/login', function (req,res) {
    console.log(req.body);
    db.adduser({
        username: req.body.username
    }, function(result) {
        res.redirect('./index3.html')

    })
    //save this to db
    console.log("db run")
})


io.on('connection', function (socket) {
    console.log('A user is connected');
    socket.on('chat', function(data) {

        io.emit('chat', data)
    })
    socket.on('drawSquare',function(data){
        console.log(data);
        io.emit('drawSquare',data);
    });

    socket.on('drawRect',function(data){
        console.log(data);
        io.emit('drawRect',data);
    });
    socket.on('drawCircle',function(data){
        console.log(data);
        io.emit('drawCircle',data);
    });
    socket.on('drawTriangle',function(data){
        console.log(data);
        io.emit('drawTriangle',data);
    });

     


});




server.listen(app.get('port'),function(){
    console.log('Server started on port:'+app.get('port'))
});

