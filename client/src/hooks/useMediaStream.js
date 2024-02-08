import React, { useEffect, useState } from 'react'

const useMediaStream = () => {
    const [stream, setStream] = useState(null);

    useEffect(() => {
        (async function initStream() {
            try {
                const localStream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: true
                })
                console.log("Setting your stream!");
                setStream(localStream);
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])

    return { stream }
}

export default useMediaStream;
