"use client"

import Navbar from '@/components/navbar/Navbar'
import Image from 'next/image'
import HomeImg from '../assets/Home.png'
import "./App.scss";
import Link from 'next/link';
import { useSelector } from 'react-redux';

export default function Home() {

  const { roomId } = useSelector(state => state.room);
  return (
    <div className="home">
      <Navbar />
      <div className="container">
        <div className="left">
          <div className="text">
            <p>From strangers to friend,</p>
            <p>the journey just got easy</p>
          </div>

          <div className="action">
            <h3>Start chatting :</h3>
            <div className="chat_btns">
              <div className="video_btn">
                <Link
                  href={`/video/${roomId}`}
                  className='link'>
                  Video
                </Link>
              </div>
              <div className="text_btn">
                <Link
                  href="/text"
                  className='link'
                >
                  Text
                </Link>
              </div>
            </div>
          </div>

          <div className="notice">
            <div>Note : Your video is monitored, please keep it clean.</div>
          </div>
        </div>
        <div className="right">
          <Image className='img' src={HomeImg} height={400} width={500} alt="" />
        </div>
      </div>
    </div>
  )
}
