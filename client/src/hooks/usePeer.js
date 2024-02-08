import SocketContext from "@/context/socket";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const usePeer = () => {
    const { socket } = useContext(SocketContext);

    const [peer, setPeer] = useState();
    const [myId, setMyId] = useState();
    
    const {roomId} = useSelector(state => state.room);
    console.log({roomId})
    useEffect(() => {
        (async function initPeer() {
            const myPeer = new (await import('peerjs')).default();
            setPeer(myPeer);

            myPeer.on('open', (id) => {
                console.log(`Your peer id is ${id}`)
                setMyId(id);

                socket?.emit("joinVideoRoom", { roomId, id })
            })
        })()
        // eslint-disable-next-line
    }, [])

    return { peer, myId }
}

export default usePeer;