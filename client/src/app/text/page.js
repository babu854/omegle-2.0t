"use client";

import React, { useContext, useEffect, useState } from 'react'
import './text.scss';
import Navbar from '@/components/navbar/Navbar';
import Message from '@/components/message/Message';
import Input from '@/components/input/Input';
import { io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux';
import { setMessageList, setRoomId } from '@/redux/features/roomSlice';
import SocketContext from '@/context/socket';

const Text = () => {

  const { messageList } = useSelector(state => state.room);
  const dispatch = useDispatch();
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket?.on("receive_message", (data) => {
      dispatch(setMessageList(data));
    })
    // eslint-disable-next-line
  }, [socket])

  return (
    <div className='text'>
      <Navbar />
      <div className="chat">
        <div className="container">
          <div className="chatInfo">
            <span>Chats</span>
          </div>
          <div className="messages">
            {messageList?.map((message) => {
              return <Message messageContent={message} key={Math.random()} />
            })}
          </div>
          <Input
            socket={socket}
          />
        </div>
      </div>
    </div>
  )
}

export default Text
