import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "./features/roomSlice";
import userReducer from "./features/userSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        room: roomReducer
    }
})

export default store;