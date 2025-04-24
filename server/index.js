const express = require("express");


const app = express ();
const http = require ('http');
const cors = require ('cors');

const {Server} = require('socket.io');
const { Socket } = require("dgram");

const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
    cors: {
        origin:'*',
        methods:['GET', 'POST']
    },
})


app.get("/", (req,res)=>{
        res.send("hello server is started");
});

io.on('connection', (socket)=>{
    console.log(`user connected of userid ${socket.id}`);

    socket.on('disconnect', ()=>{
        disconnectEventHandler(socket.id);
    });
})

const PORT= process.env.PORT || 3003
server.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT} `);
});

const disconnectEventHandler =(id)=>{
    console.log(`socket disconnect with id  ${id}`);
};

