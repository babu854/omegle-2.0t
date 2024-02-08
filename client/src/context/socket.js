"use client";

import { setRoomId } from "@/redux/features/roomSlice";
import React, { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const socketInstance = io(`${process.env.NEXT_PUBLIC_BASE_URL}`);
        setSocket(socketInstance);
    }, [])

    useEffect(() => {
        socket?.emit('joinRoom');

        socket?.on("getRoomId", (roomId) => {
            dispatch(setRoomId(roomId));
            console.log({ roomId })
        })

        return () => {
            socket?.disconnect();
        }
        // eslint-disable-next-line
    }, [socket])
    return (
        <SocketContext.Provider value={{ socket,setSocket }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContext;