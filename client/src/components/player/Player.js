import React from 'react'
import ReactPlayer from 'react-player'

const Player = ({ url, muted, playing }) => {
    return (
        <ReactPlayer height={"100%"} width={"100%"} url={url} muted={muted} playing={playing} />
    )

}

export default Player
