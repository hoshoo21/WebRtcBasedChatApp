
import io from 'socket.io-client';
let socketClient = null;

export const connectToSocketServer = ()=>{
    if (!socketClient) {
        socketClient = io('http://localhost:3003');

        socketClient.on("connect", () => {
            console.log("Socket client connected");
        });
       
        socketClient.on("disconnect", () => {
            console.log("Socket client disconnected");
        });
    }

    return socketClient;
}


export const proceedWithLogin =(data)=>{
    socketClient.emit ("user-login", data);
}

export const getSocketClient = () => {
    if (!socketClient) {
        throw new Error("Socket client is not initialized. Call connectToSocketServer() first.");
    }
    return socketClient;
};
