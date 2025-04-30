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

let onLineUser = {};

io.on('connection', (socket)=>{
    console.log(`user connected of userid ${socket.id}`);

    socket.on('disconnect', ()=>{
        disconnectEventHandler(socket.id);
    });
     socket.on('user-login', (data)=>{
            loginHandler(socket,data);
     });
});

const PORT= process.env.PORT || 3003
server.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT} `);
});


const disconnectEventHandler =(id)=>{
    console.log(`socket disconnect with id  ${id}`);
    removeUser(id);
};

const removeUser=(id)=>{
        if (onLineUser[id]){
            delete onLineUser[id];
        }
}
const loginHandler = (socket, data)=> {
    socket.join("logged-users");
    onLineUser[socket.id]= {
        username :data.username,
        coords : data.coords
    };
    console.log(data);
    io.to("logged-users").emit("online-users", convertOnlineUsersToArray() );
}

const convertOnlineUsersToArray =()=>{
    let onLineUsers = [];
    Object.entries(onLineUser).forEach(([key, value])=>{
        onLineUsers.push({id:key, username : value.username, data : value.coords});
    });
    console.log(onLineUsers);
    return onLineUsers;
}
