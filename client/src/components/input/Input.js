"use client";

import React, { useContext, useEffect, useState } from 'react'
import './Input.scss';
import Image from 'next/image';
import AttachImg from '../../assets/attach.png';
import Img from '../../assets/img.png';
import { useDispatch, useSelector } from 'react-redux';
import { setMessage, setMessageList } from '@/redux/features/roomSlice';

const Input = ({ socket }) => {
    const [enteredMessage, setEnteredMessage] = useState('');
    const { roomId } = useSelector(state => state.room);
    const {currentUser} = useSelector(state => state.user); 
    const dispatch = useDispatch();

    const inputChangeHandler = (event) => {
        setEnteredMessage(event.target.value);
    }

    const sendMessaage = async () => {
        const messageData = {
            room: roomId,
            username: currentUser.name,
            userImg:currentUser.img,
            message: enteredMessage
        }

        await socket.emit("send_message", messageData);
        dispatch(setMessageList(messageData));
        dispatch(setMessage(enteredMessage));
        setEnteredMessage('');
    }

    return (
        <div className='input'>
            <button>Next</button>
            <input
                type="text"
                placeholder='Type something..'
                value={enteredMessage}
                onChange={inputChangeHandler}
            />
            <div className="send">
                <Image src={AttachImg} className='img' height={24} alt='' />
                <input type="file" id="file" style={{ display: "none" }} />
                <label htmlFor="file">
                    <Image src={Img} className='img' height={24} alt='' />
                </label>
                <button onClick={sendMessaage}>Send</button>
            </div>
        </div>
    )
}

export default Input
