import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connect from "./utils/database.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8080;
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// middlewares
app.use(cookieParser());
app.use(cors({
    origin: 'https://omegle-2.vercel.app',
    credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json("Server is running")
})
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// error handling
app.use((err, req, res, next) => {
    const errStatus = err.status || 500;
    const errMessage = err.message || "Something went wrong!";
    return res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMessage,
    })
})


// sockets 
const rooms = {};

io.on("connection", (socket) => {
    console.log(`user is connected with id: ${socket.id}`);

    socket.on('joinRoom', () => {
        let roomFound = false;

        // Iterate through existing rooms
        Object.keys(rooms).forEach((roomId) => {
            if (rooms[roomId].length < 2 && !roomFound) {
                // Room has space; add user to the room
                socket.join(roomId);
                rooms[roomId].push(socket.id);
                roomFound = true;

                socket.emit("getRoomId", roomId);
            }
        });

        // If no available rooms, create a new one
        if (!roomFound) {
            // const newRoomId = socket.id;
            const newRoomId = generateRoomId();
            socket.join(newRoomId);
            rooms[newRoomId] = [socket.id];

            socket.emit("getRoomId", newRoomId);
        }
        console.log(rooms)
    });

    socket.on("send_message", (data) => {
        // socket.to(data.room).emit("receive_message", data)
        // console.log(data)
        if (rooms[data.room]) {
            socket.to(data.room).emit("receive_message", data);
            console.log(data);
        } else {
            // Handle invalid room error
            console.error(`Invalid room: ${data.room}`);
        }
    })

    socket.on('disconnect', () => {
        console.log('A user disconnected');

        // Remove the user from the room
        Object.keys(rooms).forEach((roomId) => {
            rooms[roomId] = rooms[roomId].filter((id) => id !== socket.id);
            if (rooms[roomId].length === 0) {
                delete rooms[roomId];
            }
        });
        console.log(rooms)
    });

    socket.on("joinVideoRoom", ({ roomId, id }) => {
        console.log(`A new user ${id} joined the room ${roomId}`)
        socket.join(roomId);
        socket.broadcast.to(roomId).emit("userConnected", id)
    })
    function generateRoomId() {
        // Implement a proper room ID generation logic
        return Math.random().toString(36).substring(7);
    }
})



server.listen(PORT, () => {
    connect();
    console.log(`Server is listening at http://localhost:${PORT}`);
})