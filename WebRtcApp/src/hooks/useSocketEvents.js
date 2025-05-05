import { useEffect } from 'react';
import { getSocketClient } from '../connection/SocketConnection';

const useSocketEvents = ({ onLogin, userData, setOnlineUsers, removeUser  }) => {
  useEffect(() => {
    const socket = getSocketClient();

    const handleOnlineUsers = (data) => {
      console.log("Received online-users", data);
      setOnlineUsers(data);
    };

    const handleUserDisconnected = (data) => {
      console.log("User disconnected", data);
      removeUser(data);
    };

    socket.on("online-users", handleOnlineUsers);
    socket.on("user-disconnected", handleUserDisconnected);

    if (onLogin && userData) {
      console.log("User login")
      console.log(userData);
      socket.emit("user-login", {
        username: userData.username,
        coords: userData.coords,
      });
    }

    return () => {
      socket.off("online-users", handleOnlineUsers);
      socket.off("user-disconnected", handleUserDisconnected);
    };
  }, [setOnlineUsers, removeUser, userData]);
};

export default useSocketEvents;
