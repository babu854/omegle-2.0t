"use client";

import React, { useEffect, useState } from 'react'
import './signup.scss';
import Link from 'next/link';
import Navbar from '@/components/navbar/Navbar';
import AddAvatar from '../../assets/addAvatar.png';
import Image from 'next/image';
import axios from 'axios';
import { storage } from '@/firebase/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useRouter } from 'next/navigation';

const Register = () => {

    const [enteredValues, setEnteredValues] = useState({
        name: '',
        email: '',
        password: '',
        img: null
    })
    const [file, setFile] = useState(null);
    const [perc, setPerc] = useState(0);

    const router = useRouter()

    const handleChange = (event) => {
        setEnteredValues((prev) => {
            return { ...prev, [event.target.name]: event.target.value };
        })
    }

    const handleFile = (event) => {
        setFile(event.target.files[0]);
    }

    const uploadFile = () => {
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setPerc(progress);
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setEnteredValues((prev) => {
                        return { ...prev, img: downloadURL };
                    })
                });
            }
        );
    }

    useEffect(() => {
        file && uploadFile();
        // eslint-disable-next-line
    }, [file])

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { name, email, password, img } = enteredValues;
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`, {
                name, email, password, img
            });
            console.log(res.data);
            router.push('/login');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='register'>
            <Navbar />
            <div className='container'>
                <div className='wrapper'>

                    <span className='title'>Register</span>
                    <form onSubmit={handleSubmit}>
                        <input
                            type='text'
                            placeholder='Name'
                            value={enteredValues.name}
                            name='name'
                            onChange={handleChange}
                        />
                        <input
                            type='email'
                            placeholder='Email'
                            value={enteredValues.email}
                            name='email'
                            onChange={handleChange}
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            value={enteredValues.password}
                            name='password'
                            onChange={handleChange}
                        />
                        <input
                            type='file'
                            id='file'
                            style={{ display: "none" }}
                            accept='image/*'
                            onChange={handleFile}
                        />
                        <label htmlFor='file'>
                            <Image width={32} src={AddAvatar} alt="" />
                            <span>Add an avatar</span>
                        </label>
                        <button disabled={perc > 0 && perc < 100}>Sign up</button>
                    </form>
                    <p>You do have an account?
                        <Link href={"/login"} className='link'> Login</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register
